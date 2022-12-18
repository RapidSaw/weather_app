let tikTok = document.querySelector(".watch")
let date = document.querySelector(".date")

function watch () {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thirsday", "Friday", "Saturday"]
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octobet", "November", "December"]
    let time = new Date()
    let dom = time.getDate()
    let month = time.getMonth()
    let y = time.getFullYear()
    let d = time.getDay()
    let h = time.getHours()
    let m = time.getMinutes()

    if (h < 10) {
        h = "0" + h
    }

    if (m < 10) {
        m = "0" + m
    }

    let watchString = h +":"+ m;
    let dayString = days[d]
    let dateString = days[d] + " " + months[month] + " " + dom + ", " + y
    
    tikTok.textContent = watchString
    date.textContent = dateString
}

setInterval(watch, 1000)
watch()