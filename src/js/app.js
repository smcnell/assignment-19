console.log('wat')

import $ from 'jquery';

var forEach = function(arr,cb){for(var i = 0; i < arr.length; i++){ cb(arr[i], i, arr)  } }
// // var concertsEl=document.querySelector(".concerts-container")
var informationEl= document.querySelector(".information-giant")
var bigHTMLStr= ''
var giantRepoSectionHTML= ''

//search bar button //
var inputEl= document.querySelector(".mysearch")
// console.log(inputEl.className)
var buttonEl= document.querySelector(".mybutton")
// console.log(buttonEl.className)





function createPageTemplate(dataArray1Profile, dataArray2Repo){
// console.log(dataArray1Profile)

  var profileSectionHTML=
  `
  <div class='profile-container'>
    <img src="${dataArray1Profile.avatar_url}" alt="">
    <h1><i class="fa fa-user" aria-hidden="true"></i>${dataArray1Profile.name}</h1>
    <h2></i>${dataArray1Profile.login}</h2>
    <h3><i class="fa fa-rss-square" aria-hidden="true"></i>${dataArray1Profile.blog}</h3>
    <h3><i class="fa fa-map-marker" aria-hidden="true"></i>${dataArray1Profile.location}</h3>
    <h3><i class="fa fa-envelope-o" aria-hidden="true"></i>${dataArray1Profile.email}</h3>
    <h4><i class="fa fa-list-ul" aria-hidden="true"></i>${dataArray1Profile.repos_url}</h4>
  </div>

  `


forEach(dataArray2Repo, function(repObj){
// console.log(repObj)

  var repoSectionHTML= ''
    repoSectionHTML+= `

    <div class= "one-repo">
      <h1>${repObj.html_url}</h1>
			<h2>${repObj.description}</h2>
			<p>${repObj.updated_at}</p>
			<p><i class="fa fa-star" aria-hidden="true"></i>${repObj.stargazers_count}</p>
    </div>

`
giantRepoSectionHTML+=repoSectionHTML
})
bigHTMLStr=profileSectionHTML + "<div class='repo-container'>" + giantRepoSectionHTML + "</div>"
// console.log(bigHTMLStr)
informationEl.innerHTML= bigHTMLStr
// console.log(repoSectionHTML)
}





var profileName= "smcnell"
var fetchProfilePromise= $.getJSON(`https://api.github.com/users/${profileName}`)
var fetchRepoPromise= $.getJSON(`https://api.github.com/users/${profileName}/repos`)
var inputValue= ""


//click to search //
buttonEl.addEventListener("click", function(evt){
inputValue= inputEl.value
console.log(inputValue)
profileName=inputValue
console.log('hey')
console.log(profileName)
// bigHTMLStr=""
callMyName()
})


function callMyName(){
  console.log(profileName)
  fetchProfilePromise= $.getJSON(`https://api.github.com/users/${profileName}`)
  fetchRepoPromise= $.getJSON(`https://api.github.com/users/${profileName}/repos`)
  console.log(fetchRepoPromise, fetchProfilePromise)


  $.when(fetchProfilePromise, fetchRepoPromise).then(function(profileData, repoData){
    // console.log(profileData[0])
    // console.log(repoData[0])
    var htmlTemplate= createPageTemplate(profileData[0], repoData[0])
    // informationEl.innerHTML= htmlTemplate
  })
}




$.when(fetchProfilePromise, fetchRepoPromise).then(function(profileData, repoData){
  // console.log(profileData[0])
  // console.log(repoData[0])
  var htmlTemplate= createPageTemplate(profileData[0], repoData[0])
  // informationEl.innerHTML= htmlTemplate
})
