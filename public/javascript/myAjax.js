$(() => {
	
	let visitorsBody = $('tbody');
	let bodyAppend = (data) => {
		data.visitors.forEach((visitor) => {
			visitorsBody.append(
				'\
        <tr>\
            <td class="visitorid">' +
					visitor.visitorid +
					'</td>\
            <td><input type="text" class="tabletxt fullname" value= "' +
					visitor.fullname +
					'"></td>\
            <td><input type="text" class="tabletxt visitorsage" value= "' +
					visitor.visitorsage +
					'"></td>\
            <td><input type="text" class="tabletxt dateofvisit" value= "' +
					visitor.dateofvisit +
					'"></td>\
            <td><input type="text" class="tabletxt timeofvisit" value= "' +
					visitor.timeofvisit +
					'"></td>\
            <td><input type="text" class="tabletxt assistedby" value= "' +
					visitor.assistedby +
					'"></td>\
            <td><input type="text" class="comments tabletxt" value= "' +
					visitor.comments +
					'"></td>\
            <td> <button class="update tbodybtn">Update</button>\
            <td> <button class="delete tbodybtn">Delete</button>\
        </tr>\
        '
			);
		});
	};

	$('#addVisitor').on('submit', (event) => {
        event.preventDefault();
        let visitorInfo = JSON.stringify({
            fullname: $('#visitor_name').val(),
            assistedby: $('#your_name').val(),
            visitorsage: $('#visitor_age').val(),
            dateofvisit: $('#date_of_visit').val(),
            timeofvisit: $('#time_of_visit').val(),
            comments: $('#comments').val(),
		});
		console.log(visitorInfo)
		$.ajax({
			url: '/api/addNewVisitor',
			method: 'POST',
			contentType: 'application/json',
			data: visitorInfo,
			success: (data) => { 
				$('#viewVisitorsbtn').click()
				for (let i = 0; i < event.target.length; i++) {
					event.target[i].value = '';	
				}	
			},
		});
	});

	$('#viewVisitorsbtn').on('click', () => {
		$.ajax({
		url: '/api/viewVisitors',
		method: 'GET',
		contentType: 'application/json',
		success: (data) => {
			visitorsBody.html('')
			bodyAppend(data);
		},
	});
})

	$(visitorsBody).on('click', '.delete', (e) => {
		let visitorRow =  e.target.closest('tr');
		let id = $(visitorRow).find('.visitorid').text();
		
		
		$.ajax({
			url: `/api/deletevisitor/${id}`,
			method: 'DELETE',
			contentType: 'application/json',
			success: (data) => {
				alert("Visitor deleted");
				$('#viewVisitorsbtn').click()
			},
		});
	});

	$(visitorsBody).on('click', '.update', (e) => {
		
		let visitorRow = e.target.closest('tr');
		let id = $(visitorRow).find('.visitorid').text();
		let fullname = $(visitorRow).find('.fullname').val();
		let age = $(visitorRow).find('.visitorsage').val();
		let date = $(visitorRow).find('.dateofvisit').val();
		let time = $(visitorRow).find('.timeofvisit').val();
		let assistedby = $(visitorRow).find('.assistedby').val();
		let comments = $(visitorRow).find('.comments').val();

		
		let visitorInfo = JSON.stringify({
			fullname: fullname,
			visitorsage: age,
			dateofvisit: date,
			timeofvisit: time,
			assistedby: assistedby,
			comments: comments
		});
		console.log("this is the information",visitorInfo)
		$.ajax({
			url: '/api/updateVisitor/' + id,
			method: 'PUT',
			contentType: 'application/json',
			data: visitorInfo,
			success: () => {
				alert('Visitor Updated');
				$('#viewVisitorsbtn').click()
			},
		});
	});
	(function appendData(){
		$('#viewVisitorsbtn').click()
	})()
});
