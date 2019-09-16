async function init() {
  var user = await (await fetch(
    localStorage.server + "/me?options=" + localStorage.options,
    { method: "POST" },
  )).json()

  if (user.email) {
    showIsLogin(user.email)
  } else {
    showIsLogout()
  }

  $(".dashboard").click((e) => {
    window.open(
      localStorage.server + "/dashboard?options=" + localStorage.options,
      "_blank",
    )
    e.preventDefault()
  })
  $(".logout").click(async (e) => {
    await (await fetch(
      localStorage.server + "/logout?options=" + localStorage.options,
      { method: "POST" },
    )).json()
    showIsLogout()
  })
  $(".login").click((e) => {
    window.open(
      localStorage.server + "/login?options=" + localStorage.options,
      "_blank",
    )
    e.preventDefault()
  })
}

function showIsLogin(email) {
  $(".email").text(email)
  $(".login").hide()
  $(".logout").show()
}
function showIsLogout() {
  $(".email").text("")
  $(".login").show()
  $(".logout").hide()
}
init()
