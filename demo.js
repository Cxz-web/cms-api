/* const fs = require('fs');

function readFile(...args){
	return new Promise((resolve,reject)=>{
				fs.readFile(...args,(err,data)=>{
					if(err)
					{
						return reject(err);
					}
					resolve(data);
				})
	})
}


async function add(){
	const ret =await readFile('./data.txt','utf8');
	console.log(ret);
}
add(); */

function *add(){
	console.log(1);
	const a = yield 1+1;
	console.log(2);
	const b =yield 2;
	console.log(a,b);
	
	
}

const  a = add();

console.log(a.next());
 

/* const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

const fn = function*(){
	
	const a1 = yield readFile('./data.txt');
   
	
    const a2 = yield readFile('./data2.txt');

	console.log(a1);
	console.log(a2);
}


const g = fn();

 g.next().value.then(function(data){
	
	g.next(1);
	g.next(); */

	/*  g.next(data).value.then(function(data){
		g.next(data) 
	})   */
