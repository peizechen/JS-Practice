document.getElementById('ordersInputForm').addEventListener('submit', createOrder);

function createOrder(e) {
	var name = document.getElementById('nameInput').value;
	var phone = document.getElementById('phoneInput').value;
	var address = document.getElementById('addressInput').value;
	var size = document.getElementById('sizeInput').value;
	var type = document.getElementById('typeInput').value;
	var id = chance.guid();
	var status = 'Received';

	var order = {
		id: id,
		name: name,
		phone: phone,
		address: address,
		size: size,
		type: type,
		status: status
	};

	if (localStorage.getItem('orders') == null) {
		var orders = [];
		orders.push(order);
		localStorage.setItem('orders', JSON.stringify(orders));
	} else {
		var orders = JSON.parse(localStorage.getItem('orders'));
		orders.push(order);
		localStorage.setItem('orders', JSON.stringify(orders));	
	}

	document.getElementById('ordersInputForm').reset();

	receiveOrders();

	e.preventDefault();
}

function setStatusFullfilled(id) {
	var orders = JSON.parse(localStorage.getItem('orders'));

	for (var i = 0; i < orders.length; i++) {
		if (orders[i].id == id) {
			orders[i].status = 'Fullfill';
		}
	}

	localStorage.setItem('orders', JSON.stringify(orders));

	receiveOrders();
}

function deleteOrder(id) {
	var orders = JSON.parse(localStorage.getItem('orders'));

	for (var i = 0; i < orders.length; i++) {
		if (orders[i].id == id) {
			orders.splice(i, 1);
		}
	}

	localStorage.setItem('orders', JSON.stringify(orders));

	receiveOrders();
}

function receiveOrders() {
	var orders = JSON.parse(localStorage.getItem('orders'));
	var ordersList = document.getElementById('ordersList');

	ordersList.innerHTML = '';

	for (var i = 0; i < orders.length; i++) {
		var id = orders[i].id;
		var name = orders[i].name;
		var phone = orders[i].phone;
		var address = orders[i].address;
		var size = orders[i].size;
		var type = orders[i].type;
		var status = orders[i].status;

		ordersList.innerHTML += '<div class="well">'+
	                            '<h6>Order ID: ' + id + '</h6>'+
	                            '<p><span class="label label-info">' + status + '</span></p>'+
	                            '<h3>' + name + '</h3>'+
	                            '<p><span class="glyphicon glyphicon-home"></span> ' + address + '</p>'+
	                            '<p><span class="glyphicon glyphicon-phone"></span> ' + phone + '</p>'+
	                            '<p><span class="glyphicon glyphicon-record"></span> ' + size + '</p>'+
	                            '<p><span class="glyphicon glyphicon-cutlery"></span> ' + type + '</p>'+
	                            '<a href="#" onclick="setStatusFullfilled(\''+id+'\')" class="btn btn-warning">Fullfill</a> '+
	                            '<a href="#" onclick="deleteOrder(\''+id+'\')" class="btn btn-danger">Delete</a>'+
	                            '</div>';
	}
}