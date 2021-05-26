



let div1 = document.getElementsByClassName("tr");
let div2 = document.querySelector("td");
let div3 = document.querySelector("input");

for (let child of div1) {
  child.addEventListener('mouseover' , function (event) {
  	child.lastElementChild.style.display = 'block'
  	child.lastElementChild.addEventListener('click' , function (event){
  		child.remove()
		totals()
		// subtotal_value()
		tax_input_change()
		discount_input_change()
		balance_left();
			
  	})
  })
}

for (let child of div1) {
  table.addEventListener('mouseout' , function (event) {
  	if(event.target.id == "one"){
  		event.target.lastElementChild.style.display = 'none'	
  	}
  })
}

// for (let child of div1) {
//   child.addEventListener('mouseout' , function (event) {
//   	child.lastElementChild.style.display = 'none'	
//   })
// }

div2.addEventListener("click", function (event) {
  // console.log('other thing 1');
}, false);

div3.addEventListener("click", function (event) {
  // console.log('other thing 2');
}, false);


for (item of div1) {
	let queries = item.querySelectorAll('input')
	let res = item.getElementsByClassName('res')

	// console.log(res[0].textContent)
	// console.log(queries[1].value)
	


	queries[1].addEventListener('keyup', function(event){
		// console.log(event.target.value)
		res[0].textContent = event.target.value * queries[2].value
		let kojo = +res[0].textContent  
		kojo = kojo.toFixed(2)
		res[0].textContent = kojo
		totals()
		discount_input_change()
		tax_input_change()
		balance_left();
		

	})

	queries[1].addEventListener('change', function(event){
		// console.log(event.target.value)
		res[0].textContent = event.target.value * queries[2].value
		let kojo = +res[0].textContent  
		kojo = kojo.toFixed(2)
		res[0].textContent = kojo
		totals()
		discount_input_change()
		tax_input_change()
		balance_left();
		

	})


	queries[2].addEventListener('keyup', function(event){

		res[0].textContent = queries[1].value * queries[2].value 
		let kojo = +res[0].textContent  
		kojo = kojo.toFixed(2)
		res[0].textContent = kojo		
		totals()
		discount_input_change()
		tax_input_change()
		balance_left();
		


	})

	queries[2].addEventListener('change', function(event){
		res[0].textContent = queries[1].value * queries[2].value 
		let kojo = +res[0].textContent  
		kojo = kojo.toFixed(2)
		res[0].textContent = kojo		
		totals()
		discount_input_change()
		tax_input_change()
		
		
	})	
}




// find sub total


function totals () {
let total = 0;
let getRes = document.querySelectorAll('.res');
let no = []

getRes.forEach(function(item){
	no.push(Number(item.innerHTML))
})

// console.log(no)
for(let a=0 ; a < no.length ; a++){
	total += no[a];	 
}
subtotal.innerHTML = total.toFixed(2)
	return total
}



// TAX COMPONENT
function tax_input_change () {
	let result ;
	if(tax_percentage.value == 'percentage'){
		result = (tax_input.value / 100) * (subtotal.innerHTML) - discount_input_change() + (shipping_input_change()) ;

	} else {
		result = Number(tax_input.value) - discount_input_change() + (shipping_input_change());
	}
	total_things(result)
	balance_left();

}

tax_input.addEventListener('change' , tax_input_change , 'false')
tax_input.addEventListener('keyup' , tax_input_change , 'false')
tax_percentage.addEventListener('change' , tax_input_change , false)


//discount component
function discount_input_change () {
	let result ;
	if(discount_percentage.value == 'percentage'){
		result = (discount_input.value / 100) * (subtotal.innerHTML)
	} else {
		result = Number(discount_input.value);
	}

	console.log(result)
	total_things(result)
	return result;
}


discount_input.addEventListener('change' , tax_input_change , 'false')
discount_input.addEventListener('keyup' , tax_input_change , 'false')
discount_percentage.addEventListener('change' , tax_input_change , false)


function total_things (x) {
	total.innerHTML = (Number(subtotal.innerHTML) + Number(x)).toFixed(2);
}


//DISCOUNT COMPONENT 
function shipping_input_change () {
	console.log(shipping_input.value)
	return Number(shipping_input.value)
}
shipping_input.addEventListener('change' , tax_input_change , 'false')
shipping_input.addEventListener('keyup' , tax_input_change , 'false')


// 0503692732

//BALANCE DUE 
function balance_left () {
	console.log(total.innerHTML)
	balance_due.innerHTML = (Number(total.innerHTML) - Number(amount_paid.value)).toFixed(2); 
}

amount_paid.addEventListener('change' , balance_left , 'false')
amount_paid.addEventListener('keyup' , balance_left , 'false')




function getCurrency () {
	fetch('https://gist.githubusercontent.com/Fluidbyte/2973986/raw/8bb35718d0c90fdacb388961c98b8d56abc392c9/Common-Currency.json')
	 .then(response => response.json())
	 .then(data => {
	 	console.log(select_currency.value)
	 	console.log(data[select_currency.value]['symbol_native'])
	 	currency_name.innerHTML = data[select_currency.value]['name']
	 	let get_clone = document.querySelectorAll('.sign')
	 	for (item of get_clone){
	 		item.innerHTML = data[select_currency.value]['symbol_native'] 
	 	}
			let kojoo = document.getElementsByName('yoo')
			for (child of kojoo){
				console.log(child.lastElementChild.innerHTML = `Flat (${data[select_currency.value]['symbol_native']})`)
			}
	 })
}

getCurrency();	

select_currency.addEventListener('change' , getCurrency , 'false');




document.body.addEventListener('click', function(event){
	if(event.target.id == 'add_item'){
	let newTD = document.createElement('tr');
	newTD.setAttribute("class", "tr");
	newTD.setAttribute("id", "one");
	
	newTD.innerHTML = `
              <td><input type="text" placeholder="Description of service or product ..." class="form-control"></td>
              <td><input type="number" value="1" step="any" autocomplete="off" class="form-control" value="" id="currency"></td>
              <td> 
              <div class="input-group" id="input-group">
                <span class="input-group-text currency"> <span class="sign">$</span></span>
                <input type="number" id="input" step="any" autocomplete="off" class="form-control currency2" value="0" id="rate" >
              </div> 
              </td>
              <td><p class="margin-top-currency-p"><span class="sign">$</span> <span class="res">0.00</span></p></td>
              <td><i class="fa fa-trash"></i> </td>
            `;
    
            table.append(newTD);
            console.log(newTD)
            console.log(event.target)
            }
    } , true);