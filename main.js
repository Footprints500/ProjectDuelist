module.exports = function (app, db) {
  app.get("/", (req, res) => {
    res.render("login");
  });

  app.post("/entry", async (req, res) => {
    const code = req.body.code;
    const name = req.body.name;

    const room = await db.findOne({ code: code });
    if (room) {
        // Room is full
      if (room.player1 == name || player2 == name) {
        res.redirect("/full");
        return;
      }
      // join as player 2
      if (room.player2 == null) {
        db.updateOne({ code: code }, { $set: { player2: new Player(name) } });
        // enter game
        return;
      }
      // Make new room
    } else {
      db.insertOne({
        code: code,
        player1: new Player(name),
        player2: null,
        p1action: null,
        p2action: null,
      });
      //enter game
    }
  });

  app.get("/full", (req, res) => {
    res.render("roomFull");
  })

  function Player(name) {
    this.name = name;
    this.charged = false;
    this.stabbed = false;
    this.blockSpent = false;
    this.shieldCool = false;
  }
};