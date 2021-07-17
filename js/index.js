// variables
const add_item = document.getElementById('add-item')
const congrats = document.getElementById('congrats')
const parent = document.getElementById('hook')
const aside = document.getElementById('aside')
const trash = document.getElementById('trash')
const sender = document.getElementById('sender')
const receiver = document.getElementById('receiver')
const info_date = document.getElementById('info-date')
const file = document.getElementById('file_button')
const fileUpload = document.getElementById('files')


// event listeners
hook.addEventListener('mouseover' , showBin , false)
hook.addEventListener('mouseout' , hideBin , false)
hook.addEventListener('click' , removeItem , false)
hook.addEventListener('change', multiply_qty_rate , false)
hook.addEventListener('keyup', multiply_qty_rate , false)
receiver.addEventListener('keyup', checkSender , false )
sender.addEventListener('keyup', checkReceiver , false )
select_currency.addEventListener( 'change' , getCurrency , false )
congrats.addEventListener('input', autoresize, false);



// check input for sender and  bill too
function checkSender (e) {
	if(sender.value == "" || receiver.value == ""){
			button.disabled = true
			} 	else 	{
				button.disabled = false				
			}      		
      }

function checkReceiver (e) {
			if(sender.value == "" || receiver.value == ""){
				button.disabled = true
			} 	else 	{
				button.disabled = false				
			}  
      }

// gives red border if "required" is empty 
  sender.addEventListener("blur", function(){
    if(sender.value == ""){
      sender.style.border = "1px solid #e32321" 
    } else {
      sender.style.border = "1px solid #ced4da"       
    }
  })
  receiver.addEventListener("blur", function(){
    if(receiver.value == ""){
      receiver.style.border = "1px solid #e32321" 
    } else {
      receiver.style.border = "1px solid #ced4da"             
    }
  })

//adds new item into DOM
add_item.addEventListener('click', function(){
	let newItem = document.createElement('div')
	newItem.setAttribute('class', 'items flex yo')
	newItem.setAttribute('id', 'table')
	newItem.innerHTML = `<textarea autoresize name="" cols="10" rows="2" id="text" placeholder="Description of service or product ..." class="form-control"></textarea>
              <input type="number" id="qty" value="1" class="form-control text-center">
              <div class="rate-currency flex-no-align">
                <p class="bg-white p-1 mt-1" style="font-size: 0.9rem" id="currency">$</p>
                <input type="number" id="rate" value="0" class="form-control">
              </div>
              <div class="amount ">
                <h6 style="font-size:0.9rem ; font-weight: 500"><span id="currency">$</span> <span class="total">0.00</span></h6>
              </div>
              <div class="trash hide flex" >
                  <i class="fa fa-trash first-trash " id="trash"></i>            
              </div>`
	getCurrency()
	hook.append(newItem)	

	const changes  = hook.querySelectorAll('textarea')


})

//show bin
function showBin (e) {
	let eventParent;
	let parent = e.target.parentNode;
	if(parent.id == "table" ) {
		eventParent = parent
	} else if (parent.parentNode.id == "table") {
		eventParent = parent.parentNode
	} else if (parent.parentNode.parentNode.id == "table"){
		eventParent = parent.parentNode.parentNode
	} 
	if(eventParent){
		eventParent.lastElementChild.childNodes[1].style.color = 'gray'		
	}
}

//hide bin
function hideBin (e) {
	let eventParent;
	let parent = e.target.parentNode;
	if(parent.id == "table" ) {
		eventParent = parent
	} else if (parent.parentNode.id == "table") {
		eventParent = parent.parentNode
	} else if (parent.parentNode.parentNode.id == "table"){
		eventParent = parent.parentNode.parentNode
	} 
	if(eventParent){
		eventParent.lastElementChild.childNodes[1].style.color = 'white'		
	}	
}

// remove item
function removeItem (e) {
	if(e.target.id == "trash"){
		e.target.parentNode.parentNode.remove()
		sub_total()
	}
}

// multiply rate by qty
function multiply_qty_rate (e) {
	let parent ;
	if(e.target.id == "qty" ){
		parent = e.target.parentNode 
		let rate = parent.querySelector('#rate')
		let qty = parent.querySelector('#qty')
		let results = parent.querySelector('.total')	
		results.innerHTML = (rate.value * qty.value).toFixed(2)
		sub_total ()
	}	else if (e.target.id == "rate"){
		parent = e.target.parentNode.parentNode
		let rate = parent.querySelector('#rate')
		let qty = parent.querySelector('#qty')
		let results = parent.querySelector('.total')			
		results.innerHTML = (rate.value * qty.value).toFixed(2)
		sub_total ()
	}
}

//calculates sub total
function sub_total () {
	let total_Amount = document.querySelectorAll('.total');
	let hold_Amount  = 0;
	for (items of total_Amount){
		hold_Amount +=  Number(items.innerHTML);
		totalsum.innerHTML = hold_Amount.toFixed(2) 		
	} 
}

//disables download button on page loading
let button = document.getElementById('gen_pdf')
button.disabled = true



file.addEventListener('click' , function() {
   fileUpload.click();
});

//fetches API for currency
function getCurrency () {
	fetch('https://gist.githubusercontent.com/Fluidbyte/2973986/raw/8bb35718d0c90fdacb388961c98b8d56abc392c9/Common-Currency.json')
	 .then(response => response.json())
	 .then(data => {
		const currency = document.querySelectorAll('#currency')
	 	currency_name.innerHTML = data[select_currency.value]['name']
	 	currency.forEach(item => item.innerHTML = data[select_currency.value]['symbol'])
	 })
}

// gets currency after page loads
getCurrency() 

// PDF Converter
  window.onload = function () {
    document.getElementById("gen_pdf").addEventListener("click", function(){
      const name = document.querySelector(".main")
      var opt = {
          margin:       0,
          filename:     'invoice.pdf',
          image:        { type: 'jpeg', quality: 1 },
          html2canvas:  { scale: 2 },
          jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
	    
	    	html2pdf().from(name).set(opt).save();


      	removesEmptyInputs() //removes empty textarea and input of id info-date
      	hideEmptyLogoUpload()
      	removeBorder()
	      downLoaded()
	      removeEmptyDesc()

	     setInterval(function(){
	      addsBackEmptyInputs()
	      showEmptyUpload()
	      addBorder()
	    },1)

    })
  }

function autoresize(e) {
	if(e.target.id == "text" || e.target.id == "receiver" || e.target.id == "sender"){
	  e.target.style.height = '42px';
	  e.target.style.height = e.target.scrollHeight+'px';
	  e.target.scrollTop = e.target.scrollHeight;
	}
}

// removes empty textarea and input
function removesEmptyInputs () {
let getInputs = document.querySelectorAll('input')
let getTextarea = document.querySelectorAll('textarea')

getInputs.forEach(function(item){
	if(item.value == ""){
		item.parentNode.style.visibility = 'hidden'
	}
})

getTextarea.forEach(function(item){
	if(item.value == ""){
		item.parentNode.style.visibility = 'hidden'
			}
		})
add_item.style.visibility = 'hidden' //hides add item button
}

//adds back empty textarea and input for next invoice
function addsBackEmptyInputs () {
let getInputs = document.querySelectorAll('input')
let getTextarea = document.querySelectorAll('textarea')

getInputs.forEach(function(item){
	if(item.value == ""){
		item.parentNode.style.visibility = 'visible'
	}
})

getTextarea.forEach(function(item){
	if(item.value == ""){
		item.parentNode.style.display = 'hidden'
			}
		})
add_item.style.visibility = 'visible' //shows add item button
}

//gives default date to date value
function defaultDate () {
	let newDate = new Date()
	let setDate = newDate.getDate() + "/" + newDate.getMonth() + "/" + newDate.getFullYear();
	if(date.value == "") {
		date.value = setDate 
	}
}

//calls defaultDate function
defaultDate()

function downLoaded() {
	let msg = `<center class=" main p-2"> <h1> Your Invoice is being generated.. </h1> <p> Kindly look into your downloads folder </p> 
			   	<button class="btn bg-danger text-white mb-2" onClick = refresh()> Generate New Invoice </button>
			   </center>`
	congrats.innerHTML = msg 
}

function refresh () {
	window.location.reload();
}

function hideEmptyLogoUpload () {
	  if(fileUpload.value == ""){
	      file_button.style.visibility = 'hidden'  
	  } else {
		  remove.style.visibility = 'hidden'
	  }	
} 

function showEmptyUpload () {
	fileUpload.value = ""
} 



//makes uploading of image works
$(document).ready(function() {
  if (window.File && window.FileList && window.FileReader) {
    $("#files").on("change", function(e) {
      var files = e.target.files,
        filesLength = files.length;
      for (var i = 0; i < filesLength; i++) {

      if(document.getElementById("files").value != ""){
        file_button.style.display = 'none';
      }
        var f = files[i]
        var fileReader = new FileReader();
        fileReader.onload = (function(e) {
          var file = e.target;
          $("<span class=\"pip\">" +
            "<img id=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>" +
            "<br/><span id=\"remove\">Remove image</span>" +
            "</span>").insertAfter("#files");
          $("#remove").click(function(){
            $(this).parent(".pip").remove();
            file_button.style.display = 'block';
          });
            imageThumb.addEventListener('mouseover', function(){
              remove.style.visibility = 'visible'
            })
            imageThumb.addEventListener('mouseout', function(){
              remove.style.visibility = 'hidden';
            })      
            remove.addEventListener('mouseover', function(){
              remove.style.visibility = 'visible'
            })
            remove.addEventListener('mouseout', function(){
              remove.style.visibility = 'hidden';
            })
        });
        fileReader.readAsDataURL(f);
      }
    });
  } else {
    alert("Your browser doesn't support to File API")
  }
});

// removes border from input and textarea before converting to pdf
function removeBorder () {
	let cInput  = info_date.querySelectorAll('input')
	let cTextarea  = info_date.querySelectorAll('textarea')

	cInput.forEach(function(item){
		item.style.border = "none"
	})

	cTextarea.forEach(function(item){
		item.style.border = "none"
	})
}

function removeEmptyDesc () {
	let groupDesc = parent.querySelectorAll('textarea')

		groupDesc.forEach(description => {
				if(description.value === "") {
					description.parentNode.style.display = 'none'  
				}
			})
}

