jQuery.githubUser = function(username, callback) {
   jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
}
 
jQuery.fn.loadRepositories = function(username) {
    this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");
     
    var target = this;
    $.githubUser(username, function(data) {
        var repos = data.data; // JSON Parsing
        sortByName(repos);    
     
        var list = $('<dl/>');
        target.empty().append(list);
        var newRepos = $(repos).slice(0,6);
        $(newRepos).each(function() {
            if (this.name != (username.toLowerCase()+'.github.com')) {
                list.append('<dt><a href="'+ (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</a> <em>'+(this.language?('('+this.language+')'):'')+'</em></dt>');
                list.append('<dd>' + this.description +'</dd>');
                list.append('<dd>' + this.updated_at + '</dd>');
            }
        });      
      });
      
    function sortByName(repos) {
       repos.sort(function(a, b) {
    a = new Date(a.updated_at);
    b = new Date(b.updated_at);
    return a>b ? -1 : a<b ? 1 : 0;
});
    }
};
   
    function dropdownMenu() {
	var x = document.getElementById("dropdownClick");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

