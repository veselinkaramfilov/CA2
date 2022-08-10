

const addContact = () => {

    var name = document.getElementById("name").value
    var surname = document.getElementById("surname").value
    var nickname = document.getElementById("nickname").value
    var phone = document.getElementById("phone").value

    let data = {
        name: name,
        surname: surname,
        phone: phone,
        nickname: nickname
    }

    fetch("http://127.0.0.1:3000/api/user", {
        method: "POST",
        headers: {'Content-Type': 'application/json', }, 
        body: JSON.stringify(data)
      }).then(res => {
        console.log("Request complete! response:", res);
      });
}

document.getElementById("send").addEventListener("click", addContact)


const deletePhone = (id) => {

  console.log(id);
  $.ajax({
    url : "http://localhost:3000/api/delete",
    type: "POST",
    data : { deletename: id},
    success: function(data, textStatus, jqXHR)
    {
      console.log(data);
    }})
 
}



$.ajax({
    url: 'http://localhost:3000/xml',
    type: 'GET',
    dataType: 'xml',
    success: function (data) {
        var html = `<table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Nickname</th>
            <th scope="col">Phone</th>
            <th scope="col">Process</th>
          </tr>
        </thead>
        <tbody>`

        $(data).find('item').each(function () {
           
            html += `
            <tr>
                <th scope="row">${$(this).find('row').text()}</th>
                <td><input type="text" class="form-control" id="editname${$(this).find('id').text()}" value="${$(this).find('name').text()}"></td>
                <td><input type="text" class="form-control" id="editsurname${$(this).find('id').text()}" value="${$(this).find('surname').text()}"></td>
                <td><input type="text" class="form-control" id="editnick${$(this).find('id').text()}" value="${$(this).find('nickname').text()}"></td>
                <td><input type="number" class="form-control" id="editphone${$(this).find('id').text()}" value="${$(this).find('phone').text()}"></td>
                
                <td>
                    <button  type="button" class="btn btn-danger" onclick="deletePhone(${$(this).find('id').text()})">Delete</button>
                    <button type="button" class="btn btn-primary" onclick="editContact(${$(this).find('id').text()})">Edit</button>
                </td>
              </tr>`       
            
        });

        html+=`</tbody>
        </table>`
        
        $("#table").html(html);
    }

    });


    const editContact = (id) => {
      var editName = document.getElementById("editname"+id).value
      var editSurname = document.getElementById("editsurname"+id).value
      var editNick = document.getElementById("editnick"+id).value
      var editPhone = document.getElementById("editphone"+id).value
      console.log(editName + " " + editSurname + " " + editNick + " " + editPhone)
      $.ajax({
        url : "http://localhost:3000/api/update",
        type: "POST",
        data : { id: id, gname : editName, gsurname : editSurname, gphone : editPhone, gnick : editNick },
        success: function(data, textStatus, jqXHR)
        {
          console.log(data);
        }})
     
    }

    