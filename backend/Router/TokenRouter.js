const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

class TokenRouter {
  constructor(tokenService) {
    this.tokenService = tokenService;
  }

  router() {
    let router = express.Router();

    // Token
    router.get("/tokenplan", this.getTokenPlan.bind(this));
    router.get("/currenttoken/:id", this.getCurrentToken.bind(this));
    router.get(
      "/tokenpurchaserecord/:id",
      this.getTokenPurchaseRecord.bind(this)
    );
    router.get(
      "/tokentransactionrecord/:id",
      this.getTokenTransActRecord.bind(this)
    );
    router.post(
      "/token/create-payment-intent",
      this.postTokenPayment.bind(this)
    );
    router.post("/updatepurchaserecord", this.postPurchaseRecord.bind(this));
    router.put("/updatetoken", this.putToken.bind(this));

    // Redeem
    router.get("/redeemitems", this.getRedeemItems.bind(this));
    router.post("/redeem", this.postRedeem.bind(this));
    router.get("/redeemhistory/:id", this.getRedeemHistory.bind(this));

    return router;
  }

  // Get token plan
  async getTokenPlan(req, res, next) {
    try {
      let tokenPlan = await this.tokenService.getTokenPlan();
      if (tokenPlan) {
        console.log("Token plan", tokenPlan);
        res.json(tokenPlan);
      } else {
        res.json([]);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  // Get current token of member
  async getCurrentToken(req, res, next) {
    try {
      let currentToken = await this.tokenService.getCurrentToken(req.params.id);
      if (currentToken) {
        res.json(currentToken);
      } else {
        res.json([]);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  // Get token purchase record
  async getTokenPurchaseRecord(req, res, next) {
    try {
      let tokenPurchaseRecord = await this.tokenService.getTokenPurchaseRecord(
        req.params.id
      );
      if (tokenPurchaseRecord) {
        res.json(tokenPurchaseRecord);
      } else {
        res.json([]);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  // Get token transaction record
  async getTokenTransActRecord(req, res, next) {
    try {
      let tokenTransActRecord = await this.tokenService.getTokenTransActRecord(
        req.params.id
      );
      if (tokenTransActRecord) {
        res.json(tokenTransActRecord);
      } else {
        res.json([]);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  async postTokenPayment(req, res, next) {
    try {
      const detail = req.body;
      console.log(detail);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(detail.amount) * 100,
        currency: "hkd",
        metadata: req.body,
        payment_method_types: ["card"],
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  async postPurchaseRecord(req, res, next) {
    try {
      const recordId = await this.tokenService.postPurchaseRecord(
        req.body.memberId,
        req.body.planId
      );
      if (recordId) {
        res.json(recordId);
      } else {
        res.json([]);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  async putToken(req, res, next) {
    try {
      const totalToken = await this.tokenService.putToken(
        req.body.memberId,
        req.body.noOfToken
      );

      if (totalToken) {
        res.json(totalToken);
      } else {
        res.json([]);
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  // Redeem
  async getRedeemItems(req, res, next) {
    try {
      const redeemItems = await this.tokenService.getRedeemItems();
      res.json(redeemItems);
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  async postRedeem(req, res, next) {
    try {
      const redeemId = await this.tokenService.postRedeem(
        req.body.accountId,
        req.body.redeemItemId,
        req.body.quantity,
        req.body.requiredToken
      );
      if (redeemId) {
        await this.tokenService.deductStock(
          req.body.redeemItemId,
          req.body.quantity
        );
        await this.tokenService.deductMemberToken(
          req.body.accountId,
          req.body.quantity,
          req.body.requiredToken
        );
      }
      console.log(redeemId);
      res.json(redeemId);
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  async getRedeemHistory(req, res, next) {
    try {
      const redeemList = await this.tokenService.getRedeemHistory(
        req.params.id
      );
      res.json(redeemList);
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }
}

module.exports = TokenRouter;
