const { request } = require("express");

class RequestService {
  constructor(knex) {
    this.knex = knex;
  }

  /**************** Request service ****************/
  async getRequestDetail(requestId) {
    console.log("Service: ", requestId);
    try {
      let requestQuery = await this.knex
        .select("*")
        .from("request")
        .where("id", requestId);
      return requestQuery[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  async getRequesterDetail(requesterId) {
    try {
      let requesterQuery = await this.knex
        .select("id", "username", "grade", "profilePath")
        .from("account")
        .where("id", requesterId);
      return requesterQuery[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  async postNewRequest(newRequest) {
    try {
      console.log("Posting new request..");
      let requestId = await this.knex
        .insert({
          requesterId: newRequest.userId,
          title: newRequest.title,
          detail: newRequest.detail,
          reward: newRequest.reward,
          requiredPpl: newRequest.requiredPpl,
          district: newRequest.district,
          status: newRequest.status,
        })
        .into("request")
        .returning("id");
      return requestId[0];
    } catch (err) {
      throw new Error(err);
    }
  }
  /**************** Request service ****************/

  /**************** Tag service ****************/
  async getRequestTag(requestId) {
    try {
      let requestQuery = await this.knex("tagReqJoin")
        .join("tag", "tagReqJoin.tagId", "tag.id")
        .select("*")
        .where("requestId", requestId);
      if (requestQuery.length > 0) {
        console.log("Member Service getRequestTag: ", requestQuery[0]);
        return requestQuery;
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async postNewTag(newTag) {
    const addTag = async (tag) => {
      let matchedTag = await this.knex("tag").select("*").where("tagName", tag);
      console.log("MemberService postNewTag", matchedTag);
      if (!matchedTag || matchedTag.length < 1) {
        console.log("Posting new tag..");
        return this.knex.insert({ tagName: tag }).into("tag").returning("id");
      } else {
        console.log("This tag is duplicated");
        return matchedTag[0].id;
      }
    };
    try {
      let tagIdArr = newTag.map((tag) => addTag(tag));
      // console.log("tagIdArr: ", tagIdArr);
      return tagIdArr;
    } catch (err) {
      throw new Error(err);
    }
  }

  async postTagReqJoin(requestId, tagNameArr) {
    if (tagNameArr.length > 0) {
      let tagIdArray = [];
      for (let i = 0; i < tagNameArr.length; i++) {
        let tagname = tagNameArr[i];
        let tagQuery = await this.knex("tag")
          .select("id")
          .where("tagName", tagname);
        if (tagQuery && tagQuery.length > 0) {
          tagIdArray.push(tagQuery[0].id);
        }
      }
      console.log("Tagidarr: ", tagIdArray);

      tagIdArray.forEach(
        async (tagId) =>
          await this.knex
            .insert({
              tagId: tagId,
              requestId: requestId,
            })
            .into("tagReqJoin")
      );
    } else {
      console.log("Tag array empty");
      return;
    }
  }
  /**************** Tag service ****************/

  /**************** Bookmark service ****************/
  async getBookmarkList(userId) {
    try {
      let bookmarkQuery = await this.knex("bookmark")
        .select("*")
        .where("accountId", userId);
      if (bookmarkQuery && bookmarkQuery.length > 0) {
        return bookmarkQuery;
      } else {
        console.log("This man has no bookmark");
        return [];
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postBookmark(requestId, userId) {
    try {
      let repeatedBookmark = await this.knex("bookmark")
        .select("id")
        .where("accountId", userId)
        .andWhere("requestId", requestId);
      if (repeatedBookmark && repeatedBookmark.length > 0) {
        console.log("Bookmark already exist");
      } else {
        console.log("Posting new bookmark");
        return this.knex
          .insert({ accountId: userId, requestId: requestId })
          .into("bookmark");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteBookmark(requestId, userId) {
    try {
      return await this.knex("bookmark")
        .where("requestId", requestId)
        .andWhere("accountId", userId)
        .del();
    } catch (err) {
      console.log(err);
    }
  }
  /**************** Bookmark service ****************/

  /**************** Comment service ****************/
  async getPublicComment(requestId) {
    try {
      let commentQuery = await this.knex("comment")
        .select("*")
        .where("requestId", requestId)
        .andWhere("private", false);
      if (commentQuery.length > 0) {
        console.log(commentQuery);
        return commentQuery;
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async getPrivateComment(requestId) {
    try {
      let commentQuery = await this.knex("comment")
        .select("*")
        .where("requestId", requestId)
        .andWhere("private", true);
      if (commentQuery.length > 0) {
        console.log(commentQuery);
        return commentQuery;
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async postNewComment(userId, requestId, comment, type) {
    try {
      await this.knex
        .insert({
          commenterId: userId,
          requestId: requestId,
          detail: comment,
          private: type,
        })
        .into("comment");
      console.log("Inserting comment..");
    } catch (err) {
      console.log(err);
    }
  }
  /**************** Comment service ****************/

  /**************** Response service ****************/
  async getRequestResponse(requestId) {
    try {
      let requestQuery = await this.knex("response")
        .select("*")
        .where("requsetId", requestId);
      if (requestQuery.length > 0) {
        console.log(requestQuery[0]);
        return requestQuery[0];
      } else {
        return [];
      }
    } catch (err) {
      throw new Error(err);
    }
  }
  /**************** Response service ****************/
}

module.exports = RequestService;