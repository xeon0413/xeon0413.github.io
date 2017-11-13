window.onload = function () {

  var sendModalBtn = document.getElementById('send_modal');
  var sendBtns = document.querySelectorAll('.send');
  var sendCloseBtns = document.querySelectorAll('.send_form_close');

  var receiveModalBtn = document.getElementById('receive_modal');
  var receiveCloseBtns = document.querySelectorAll('.receive_form_close');
  
  // Get the dialogs.
  var sendModal = document.getElementById('send_form');
  var receiveModal = document.getElementById('receive_form');

  // Setup Event Listeners
  sendModalBtn.addEventListener('click', function(e) {

    e.preventDefault();
    sendModal.showModal();

  });
  
  for (var i = 0; i < sendCloseBtns.length; i++) {
    sendCloseBtns[i].addEventListener('click', function(e) {
      this.parentNode.close();
    });
  }

  for (var i = 0; i < sendBtns.length; i++) {
        sendBtns[i].addEventListener('click', function(e) {

           var address = document.getElementById('receive_address').value;
    
          //var address= "0x1359821c5a98e7d5aab0fa3819a47b74e0411b2e";
          if(address.search(/0x[a-zA-Z0-9]{40}/) != -1) {
         
        
              var contractAddress = '0xb20083039a3b7b76c0dc3884c6e5f41c3784671d';
              var abi = [{"constant":false,"inputs":[{"name":"_receiver","type":"address"},{"name":"_message","type":"string"}],"name":"sendMsg","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getMsg","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"bool"}],"payable":false,"type":"function"}];
              var sendMessage;

              window.web3 = new Web3(web3.currentProvider);

              sendMessage = web3.eth.contract(abi).at(contractAddress);
              sendMessage.sendMsg(address, document.getElementById('receive_contents').value, {gasPrice:web3.toWei(2, 'Gwei')}, function(e,r) {

              //  alert("TXID Copy to clipboard: Ctrl+C, Enter\n" + r);
                  alert(r);
              });

              document.getElementById('receive_address').value = "";
              document.getElementById('receive_contents').value = "";
              this.parentNode.close();

            }
            else {
        
                alert('Please, recheck your sending address.');

             }
        });
    }

    receiveModalBtn.addEventListener('click', function(e) {

      var contractAddress = '0xb20083039a3b7b76c0dc3884c6e5f41c3784671d';
      var abi = [{"constant":false,"inputs":[{"name":"_receiver","type":"address"},{"name":"_message","type":"string"}],"name":"sendMsg","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getMsg","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"bool"}],"payable":false,"type":"function"}];
      var message;

      window.web3 = new Web3(web3.currentProvider);
      message = web3.eth.contract(abi).at(contractAddress);

      message.getMsg(function(e,r) {

        document.getElementById('send_address').value = r[1];
        document.getElementById('send_contents').value = r[2];

      });

      e.preventDefault();
      receiveModal.showModal();

    });
  
  for (var i = 0; i < receiveCloseBtns.length; i++) {
    receiveCloseBtns[i].addEventListener('click', function(e) {
        document.getElementById('receive_new_img').style.display = "none";
        this.parentNode.close();
    });
  }
  
};

