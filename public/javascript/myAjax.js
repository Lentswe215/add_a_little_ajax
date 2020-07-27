$(document).ready(() => {
  let visitorsBody = $("tbody");
  $.ajax({
    url: "/api/viewVisitors",
    method: "GET",
    contentType: "application/json",
    success: (data) => {
      visitorsBody.html("");
      data.visitors.forEach((visitor) => {
        visitorsBody.append(
          '\
        <tr>\
            <td class="visitorid">' +
            visitor.visitorid +
            '</td>\
            <td><input type="text" class="form-control fullname" value= "' +
            visitor.fullname +
            '"></td>\
            <td><input type="text" class="form-control visitorsage" value= "' +
            visitor.visitorsage +
            '"></td>\
            <td><input type="text" class="form-control dateofvisit" value= "' +
            visitor.dateofvisit.match(/.+(?=T)/g) +
            '"></td>\
            <td><input type="text" class="form-control timeofvisit" value= "' +
            visitor.timeofvisit.match(/.+(?=:00)/g)  +
            '"></td>\
            <td><input type="text" class="form-control assistedby" value= "' +
            visitor.assistedby +
            '"></td>\
            <td><input type="text" class="comments form-control" value= "' +
            visitor.comments +
            '"></td>\
            <td> <button class="update btn btn-primary">Update</button>\
            <td> <button class="delete btn btn-danger">Delete</button>\
        </tr>\
        '
        );
      });
    },
    error: (err) =>{
      location.reload();
    } 
   });

  //  document.getElementById('date_of_visit').value = new Date()

  $("#addVisitor").on("submit", () => {
    let visitorInfo = JSON.stringify({
      fullname: $("#visitor_name").val(),
      assistedby: $("#your_name").val(),
      visitorsage: $("#visitor_age").val(),
      dateofvisit: $("#date_of_visit").val(),
      timeofvisit: $("#time_of_visit").val(),
      comments: $("#comments").val(),
    });
    $.ajax({
      url: "/api/addNewVisitor",
      method: "POST",
      contentType: "application/json",
      data: visitorInfo,
      success: (data) => {
        for (let i = 0; i < event.target.length; i++) {
          event.target[i].value = "";

        }
        location.reload();
      },

    });
  });


  $(visitorsBody).on("click", ".delete", (e) => {
    let visitorRow = e.target.closest("tr");
    let id = $(visitorRow).find(".visitorid").text();
    let name = $(visitorRow).find(".fullname").val()
    $.ajax({
      url: '/api/deletevisitor/' + id,
      method: 'DELETE',
      success: function(data){
       alert(`visitor ${name} has been delete`)
       location.reload()
      },
      error: function(request, msg,err) {
        console.log(request, err)
      }
    });
  });

  $(visitorsBody).on("click", ".update", (e) => {
    let visitorRow = e.target.closest("tr");
    let id = $(visitorRow).find(".visitorid").text();
    let fullname = $(visitorRow).find(".fullname").val();
    let age = $(visitorRow).find(".visitorsage").val();
    let date = $(visitorRow).find(".dateofvisit").val();
    let time = $(visitorRow).find(".timeofvisit").val();
    let assistedby = $(visitorRow).find(".assistedby").val();
    let comments = $(visitorRow).find(".comments").val();

    let visitorInfo = JSON.stringify({
      fullname: fullname,
      visitorsage: age,
      dateofvisit: date,
      timeofvisit: time,
      assistedby: assistedby,
      comments: comments,
    });
    console.log("this is the information", visitorInfo);
    $.ajax({
      url: "/api/updateVisitor/" + id,
      method: "PUT",
      contentType: "application/json",
      data: visitorInfo,
      success: () => {
        alert("Visitor Updated");
        location.reload();
      },
    });
  });
  (function appendData() {
    $("#viewVisitorsbtn").click();
  })();
});
