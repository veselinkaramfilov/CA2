const express = require("express")
const fs = require('fs');
const cors = require('cors');



const app = express();
app.use(cors())
app.get("/api/users", (req, res, next) => {
     

    let rawdata = fs.readFileSync('contact.json');
    let contacts = JSON.parse(rawdata);

  res.header("Content-Type", "application/json");
  res.status(200).send(contacts);
});

app.get("/api/user", (req, res, next) => {
    let name = "";
    let surname = ""
    let phone = ""
    let nick = ""

    let rawdata = fs.readFileSync('contact.json');
    let jsonData = JSON.parse(rawdata);
    console.log( "asdasdas" + jsonData.contacts);
    jsonData.contacts.forEach(element => {
        if(req.query.name === element.name) {
            name = element.name
            surname = element.surname
            phone = element.phone
            nick = element.nickname
        }
    });

    let contact = { 
        name: name,
        surname : surname, 
        phone : phone,
        nickname : nick
    };
     
    let data = JSON.stringify(contact, null, 2);

  res.header("Content-Type", "application/json");
  res.status(200).send(contact);
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



app.post("/api/user", (req, res, next) => {


    console.log("post request" + req.body)

    var name = req.body.name;
    var surname = req.body.surname;
    var phone = req.body.phone;
    var nick = req.body.nickname;
    var id = ""+Math.floor(Math.random() * 100000000000) + 1
    let savingData = {
        id: id,
        name: name,
        surname: surname,
        phone: phone,
        nickname: nick
    }

    let rawdata = fs.readFileSync('contact.json');
    let oldData = JSON.parse(rawdata);

    oldData['contacts'].push(savingData)
    

    let savedData = {
        ...oldData
    }



    let data = JSON.stringify(savedData, null, 2);
    fs.writeFileSync('contact.json', data);

    

  res.header("Content-Type", "application/json");
  res.status(200).send(savedData);
});

app.get("/xml", (req, res, next) => {
    let data = `<?xml version="1.0" encoding="UTF-8"?>`;
    data += `<conctacts>`;

    let rawdata = fs.readFileSync('contact.json');
    let oldData = JSON.parse(rawdata);
    
    console.log(oldData.contacts[0].name)

    for (let i = 0; i < oldData.contacts.length; i++) {
      data += `<item>
        <row>${ i + 1 }</row>
        <id>${ oldData.contacts[i].id }</id>
        <name>${oldData.contacts[i].name}</name>
        <surname>${oldData.contacts[i].surname}</surname>
        <phone>${oldData.contacts[i].phone}</phone>
        <nickname>${oldData.contacts[i].nickname}</nickname>
      </item>`;
    }
  
    data += `</conctacts>`;
    
    fs.writeFileSync('contacts.xml', data);

    res.header("Content-Type", "application/xml");
    res.status(200).send(data);
  });


  app.post("/api/delete", (req, res, next) => {

    var delname = req.body.deletename;

    let rawdata = fs.readFileSync('contact.json');
    let oldData = JSON.parse(rawdata);

    
    
   for (let i = 0; i < oldData.contacts.length; i++) {
      if(oldData.contacts[i].id == delname ){
        oldData.contacts.splice(i, i+1)
        let data = JSON.stringify(oldData, null, 2);
        fs.writeFileSync('contact.json', data);
        res.header("Content-Type", "application/json");
        res.status(200).send(oldData);
      }
    }

  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.post("/api/update", (req, res, next) => {

  var dname = req.body.gname;
  var dsurname = req.body.gsurname;
  var dnick = req.body.gnick;
  var dphone = req.body.gphone;
  var d_id = req.body.id

  let rawdata = fs.readFileSync('contact.json');
  let oldData = JSON.parse(rawdata);
  
  let updateData = {
    id : d_id,
    name: dname,
    surname: dsurname,
    phone: dphone,
    nickname: dnick
}


 for (let i = 0; i < oldData.contacts.length; i++) {
    if(oldData.contacts[i].id == d_id ){
      oldData.contacts.splice(i, i+1, updateData)
      let data = JSON.stringify(oldData, null, 2);
      fs.writeFileSync('contact.json', data);
      res.header("Content-Type", "application/json");
      res.status(200).send(oldData);
    }
  }

});