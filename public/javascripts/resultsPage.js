$(document).ready(function(){
	$("#buttonTest").click(function(event){
			event.preventDefault();
			var courseToSearch = $('#courseInput').val();
			var yearToSearch = $('#yearInput').val();
			var locationToSearch = $('#locationInput').val();
			
			$.ajax({
				type:'POST',
				url:'/getCompany',
				contentType:'application/json;charset="utf-8"',
				dataType:'json',
				data:JSON.stringify({"course":courseToSearch, "year":yearToSearch, "location":locationToSearch}),
				success: function(data){
					var output = "";
					output += "Results found : "+data.length+"<br><br>";
					for(var i=0; i<data.length; i++)
					{
						output += "<table align = 'center' width='100%'>"
									+"<table>"
									 +"<tr>"
										+"<th width='15%'>"+ data[i].name +"</th> "
										+"<th></th>"
									 +"</tr><tr>"
										+"<td width='20%'>"+ data[i].course +"</td>"
										+"<td width='20%'>"+ data[i].date +"</td> "
										+"<td width='20%'>"+ data[i].duration +"</td> "
										+"<td rowspan = '2'width='30%'>"+ data[i].description +"</td> "
									 +"</tr><tr>"
										+"<td width='20%'>"+ data[i].location +"</td>"
										+"<td width='20%'>"+ data[i].email +"</td>"
										+"<td width='20%'><a href='"+data[i].website+"'</a>Contact</td>"
									 +"</tr>"
									+"</table>"
									+"<br><br>"
								+"</table>";
					}
					$( "#companyPosts" ).html( output );
				}
			});
		});
		$("#allTest").click(function (event) {
			event.preventDefault();
			    $.get( "/getAllCompanies", function( data ) {
					var output = "";
					output += "Results found : "+data.length+"<br><br>";
					for(var i=0; i<data.length; i++)
					{
						output += "<table align = 'center' width='100%'>"
									+"<table>"
									 +"<tr>"
										+"<th width='15%'>"+ data[i].name +"</th> "
										+"<th></th>"
									 +"</tr><tr>"
										+"<td width='20%'>"+ data[i].course +"</td>"
										+"<td width='20%'>"+ data[i].date +"</td> "
										+"<td width='10%'>"+ data[i].duration +"</td> "
										+"<td rowspan = '2'width='30%'>"+ data[i].description +"</td> "
									 +"</tr><tr>"
										+"<td width='20%'>"+ data[i].location +"</td>"
										+"<td width='20%'>"+ data[i].email +"</td>"
										+"<td width='10%'><a href='"+data[i].website+"'</a>Apply</td>"
									 +"</tr>"
									+"</table>"
									+"<br><br>"
								+"</table>";
					}
					$( "#companyPosts" ).html( output );
            });
        });
});