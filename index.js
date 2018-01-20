exports.ajcon = function(r){
	return new Promise((resolve,reject) => {
	 let asyncr = r.asyn || true,
			 method = r.method || r.type || "GET",
					url = r.url || r,
		 datasend = '';
		if(r.data){
		 if(typeof r.data === 'string'){
			datasend = r.data;
			}else{
			 let str = "";
				for (let prop in r.data) {
				 if(!r.data.hasOwnProperty(prop)){continue;}
					 str += prop + "=" + r.data[prop] + "&";
					 }
						datasend = str.slice(0,-1);
					 }
						url = method === "GET" ? url+"?"+datasend : url;
					 }
					 const xhr = new XMLHttpRequest();
								 xhr.responseType = r.dataType || '';
					xhr.onload = ()=> {
				 if(r.success)r.success(xhr.response);
					 try {
							try {
							 resolve(JSON.parse(`"${xhr.response}"`))
						 } catch(e) {
							 resolve(JSON.parse(xhr.response))
						 }						
					 } catch(e) {
						 resolve(xhr.response)
					 }					
				 };
					xhr.onerror = ()=> {
						reject(xhr.status);
				 };
				xhr.open(method,url,asyncr);
			 if(method==="POST" || method==="PUT"){
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		 }
		xhr.send(datasend);
	 });
 }
