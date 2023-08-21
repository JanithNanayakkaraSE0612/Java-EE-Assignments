getAllCustomers();

$("#btnGetAll").click(function () {
    getAllCustomers();
});

function getAllCustomers(){
    $("#tblCustomer").empty();
    <!--send ajax request to the customer servlet using jQuery-->
    $.ajax({
        url: 'customer',
        dataType:"json",
        success: function (customers) {
            for (let i in customers) {
                let cus = customers[i];
                let id = cus.id;
                let name = cus.name;
                let address = cus.address;
                let row=`<tr><td>${id}</td><td>${name}</td><td>${address}</td></tr>`;
                $("#tblCustomer").append(row);
            }
        },
        error:function(error){
            console.log(error);
            alert(error.responseJSON.message);
        }
    });
}

$("#btnCustomer").click(function (){
    let formData=$("#customerForm").serialize();
    $.ajax({
        url:"customer?option=add",
        method:"post",
        data:formData,
        success:function (res){
            console.log(res);
            alert(res.message);
            getAllCustomers();
        },
        error:function (error){
            console.log(error.responseJSON);
            alert(error.responseJSON.message);
        }
    });

});

$("#btnCusDelete").click(function(){
    let formData=$("#customerForm").serialize();
    $.ajax({
        url:'customer?option=delete',
        method:'post',
        data:formData,
        success:function (res){
            console.log(res);
            alert(res.message);
            getAllCustomers();
        },
        error:function (error){
            console.log(error.responseJSON);
            alert(error.responseJSON.message);
        }
    });
});

/*
$("#btnUpdate").click(function (){

    let id = $('#txtCustomerID').val();
    let name = $('#txtCustomerName').val();
    let address = $('#txtCustomerAddress').val();
    let salary = $('#txtCustomerSalary').val();

    //json Object
   let  a = {
        "id":id,
        "name":name,
        "address":address,
        "salary":salary
    }

    let formData=$("#customerForm").serialize();
    $.ajax({
        url:'customer?option=update',
        method:'post',
        data:formData,
        success:function (res){
            console.log(res);
            alert(res.message);
            getAllCustomers();
        },
        error:function (error){
            console.log(error.responseJSON);
            alert(error.responseJSON.message);
        }
    });
});*/
$("#btnUpdate").click(function () {

    let id = $("#txtCustomerID").val();
    let name = $("#txtCustomerName").val();
    let address = $("#txtCustomerAddress").val();
    let salary = $("#txtCustomerSalary").val();

    //json object
    let a = {
        "id": id,
        "name": name,
        "address": address,
        "salary": salary
    }


    $.ajax({
        url: 'customer',
        method: 'put',
        contentType:"application/json",
        data:JSON.stringify(a),
        success: function (resp) {
            getAllCustomers();
        }
    });
});