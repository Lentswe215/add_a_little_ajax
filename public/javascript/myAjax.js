import { response } from "express"

$(()=> {
$('#addVisitor').on('submit', (event)=>{
    event.preventDefault()
    let visitorinfo = JSON.stringify({
        fullname: $('#visitor_name').val(),
        assistedby: $('#your_name').val(),
        visitorsage: $('#visitor_age').val(),
        dateofvisit: $('#date_of_visit').val(),
        timeofvisit: $('#time_of_visit').val(),
        comments: $('#comments').val()
        })
    $.ajax({
        
        url: '/api/addNewVisitor',
        method: 'POST',
        contentType: 'application/json',
        data: visitorinfo,
        success: (data)=> {
            console.log(data)
            let visitorsBody = $('tbody')
            visitorsBody.html();
           
            data.visitors.forEach((visitor) => {
                visitorsBody.append('\
                <tr>\
                    <td class="visitorid">'+visitor.visitorid+'</td>\
                    <td class="visitorid">'+visitor.fullname+'</td>\
                    <td class="visitorid">'+visitor.visitorsage+'</td>\
                    <td class="visitorid">'+visitor.dateofvisit+'</td>\
                    <td class="visitorid">'+visitor.timeofvisit+'</td>\
                    <td class="visitorid">'+visitor.assistedby+'</td>\
                    <td class="visitorid">'+visitor.comments+'</td>\
                    <td> <button class= "update">Update</button>\
                    <td> <button class= "delete">Delete</button>\
                </tr>\
                ')
            })
        }
     })
})

    $.ajax({
        url: '/api/viewVisitors',
        method: 'GET',
        contentType: 'application/json',
        success: (data) => {
            let visitorsBody = $('tbody')
            visitorsBody.html();
           
            data.visitors.forEach((visitor) => {
                visitorsBody.append('\
                <tr>\
                    <td class="visitorid">'+visitor.visitorid+'</td>\
                    <td class="fullname">'+visitor.fullname+'</td>\
                    <td class="visitorsage">'+visitor.visitorsage+'</td>\
                    <td class="dateofvisit">'+visitor.dateofvisit+'</td>\
                    <td class="timeofvisit">'+visitor.timeofvisit+'</td>\
                    <td class="assistedby">'+visitor.assistedby+'</td>\
                    <td class="comments">'+visitor.comments+'</td>\
                    <td> <button class= "update">Update</button>\
                    <td> <button class= "delete">Delete</button>\
                </tr>\
                ')
            })
        }
    })
    $('visitor_table tbody').on('click', '.delete', ()=> {
        let visitorRow = $(this).closest('tr').remove();
        let id = visitorRow.find('.visitorid').text()

        $.ajax({ 
            url: '/api/deletevisitor/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: (data) => {
                console.log(data)
            }
        })
    })

    $('visitor_table').on('click', '.update', ()=> {
        let visitorRow = $(this).closest('tr');
        let id = visitorRow.find('.visitorid').text()
        let fullname = visitorRow.find('.fullname').val()
        let visitorsage = visitorRow.find('.visitorsage').val()
        let dateofvisit = visitorRow.find('.dateofvisit').val()
        let timeofvisit = visitorRow.find('.timeofvisit').val()
        let assistedby = visitorRow.find('.assistedby').val()
        let comments = visitorRow.find('.comments').val()
        let visitorInfo = JSON.stringify({
            fullname: $('#visitor_name').val(),
            assistedby: $('#your_name').val(),
            visitorsage: $('#visitor_age').val(),
            dateofvisit: $('#date_of_visit').val(),
            timeofvisit: $('#time_of_visit').val(),
            comments: $('#comments').val()
            })

        $.ajax({
            url: '/api/updateVisitor/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: visitorInfo,
            success: () => {
                alert("Visitor Updated")
            }
        })
    })
        
    })