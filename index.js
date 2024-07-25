import { blogData } from './blogData.js'

const navBarEl = document.querySelector('.fa-bars')
const navMenuEl = document.querySelector('.nav-menu')
const navUlEl = document.querySelector('.nav-menu ul')

navBarEl.addEventListener('click', function(){
    navMenuEl.classList.toggle('nav-menu')
    navUlEl.classList.add('no-style')
})

const blogDetailsEl = document.querySelector('.blog-details')
let sectionGroup = 1    // this is tied up with view more link

// loop through each data from blogData.js and display as blog content
blogData.forEach(function(blog){
    const { blogNo, blogTitle, blogDate, blogBody, blogKeyPoints, blogTip } = blog
    const blogKeyPoints_keys = Object.keys(blogKeyPoints)
    const blogKeyPoints_values = Object.values(blogKeyPoints)
    
    if (blogNo !== 1 && blogNo % 3 === 1){
        sectionGroup++
        // when displaying as grid, view-more link should be displayed in 2nd column
        // hence dummy grids are created
        blogDetailsEl.innerHTML += `
            <p class="dummy-grid-${sectionGroup} dummy-grid"></p>
            <p id="view-${sectionGroup}" class="view-more">view more</p>
            <p class="dummy-grid-${sectionGroup} dummy-grid"></p>
        `
        
    }
    
    blogDetailsEl.innerHTML += `
    <section class="blog sg-${sectionGroup}" id="blog-${blogNo}">
        <img class="blog-img" src="./images/blog${blogNo}.png" alt="${blogTitle}" />
        <p class="blog-date">${blogDate}</p>
        <p class="blog-title" id="blog-title-${blogNo}">${blogTitle}</p>
        <p class="blog-body">${blogBody}</p>
        <div class="blog-extend blog-display-extend" id="blog-extend-${blogNo}">
            <dl class="blog-keypoints" id="dl-${blogNo}">
            </dl>
            <p class="blog-tip">${blogTip}</p>
        </div>
    </section>
`

    const dlEl = document.getElementById(`dl-${blogNo}`)
    for(let i = 0; i < blogKeyPoints_keys.length; i++){
        dlEl.innerHTML += `
            <dt>${blogKeyPoints_keys[i]}</dt>
            <dd>${blogKeyPoints_values[i]}</dd>
        `
    }
    
})

const blogTitleElArr = document.querySelectorAll('.blog-title')
for (let i = 0; i < blogTitleElArr.length; i++){
    const blogTitleId = blogTitleElArr[i].getAttribute('id')
    const blogTitleEl = document.getElementById(`blog-title-${blogTitleId.split('-')[2]}`)
    
    blogTitleEl.addEventListener('click', function(){
        const blogExtendNoEl = document.getElementById(`blog-extend-${blogTitleId.split('-')[2]}`)
        blogExtendNoEl.classList.toggle('blog-display-extend')        
    })
}

// display 3 sections first. whenever view more is clicked, next 3 sections are displayed
displaySectionGroup(1)

// handling click event listener
document.addEventListener('click', function(e){
    const targetId = e.target.id
    
    if(targetId.split('-')[0] === 'view') {
        displaySectionGroup(targetId.split('-')[1])
    } else if (targetId === 'main-page') {
        location.reload()
    } else if (targetId === 'home-title' || targetId === 'home-link') {
        buildHomePage()
    } else if (targetId === 'about-me-link') {
        buildAboutMePage()
    } else if (targetId === 'contact-link') {
        buildContactPage()
    }
})

function displaySectionGroup(sgId){
    const sectionGroupArrEl = document.querySelectorAll(`.sg-${sgId}`)
    sectionGroupArrEl.forEach(function(sgArrEl){
        sgArrEl.style.display = 'block'
    })
    
    // at a time, only one view more link should be displayed
    let currSgId = sgId
    if (currSgId > 1){
        const currViewMoreEl = document.getElementById(`view-${currSgId}`)
        if (currViewMoreEl){
            currViewMoreEl.style.display = 'none'
            // dummy grids in the same row should also be removed
            const dummyGridEl = document.querySelectorAll(`.dummy-grid-${currSgId}`)
            dummyGridEl.forEach(function(dgEl){
                dgEl.style.display = 'none'
            })
        }
    }
    
    // next sections are displayed along with the next view-more link
    let nextSgId = sgId
    nextSgId++
    const viewMoreEl = document.getElementById(`view-${nextSgId}`)
    if (viewMoreEl){
        viewMoreEl.style.display = 'block'
        viewMoreEl.classList.add('display-view-more')
    }
    
}

function buildHomePage() {
    const homeContentEl = document.querySelector('.intro')
    homeContentEl.classList.add('remove-bg')
    homeContentEl.innerHTML = `
    <div class="home-container">
    <p id="home-page-date">20 May 2024</p>
    <h2 id="home-title">Embracing mental wellbeing and a healthy lifestyle</h2>
    
    <p>Welcome to our blog, where we explore the essential aspects living a healthy and fulfilling life. Mental wellbeing and a healthy lifestyle afundamental to achieving overall happiness and productivity. In this guide, we widelve into why these elements are crucial and provide practical tips on how incorporate them into your daily routine.</p>
    <p>
    
    <img class="home-img" src="./images/blogIntro.png" alt="blogIntro" />
    
    In today's fast-paced world, maintaining mental wellbeing can often be challenging. The pressures of work, family, and social obligations can lead to stress and anxiety, impacting our overall health. It is vital to understand that mental health is just as important as physical health and requires the same level of attention and care. When we prioritize our mental wellbeing, we create a solid foundation for a more balanced and fulfilling life.
    </p>
    
    <p>
    A healthy lifestyle encompasses more than just physical fitness; it includes proper nutrition, adequate sleep, and emotional resilience. These components work synergistically to improve our overall quality of life. By adopting healthy habits, we can boost our energy levels, enhance our mood, and reduce the risk of chronic illnesses. This comprehensive guide will provide you with practical strategies to improve both your mental and physical health, helping you to lead a more vibrant and satisfying life.
    </p>
    
    <p>
    The journey to achieving mental wellbeing and a healthy lifestyle is a personal one, and it requires consistent effort and commitment. However, the rewards are immense. By making small, manageable changes to our daily routines, we can experience significant improvements in our mental clarity, emotional stability, and physical vitality. Whether you're just starting on this path or looking to enhance your current practices, this guide will offer valuable insights and actionable tips to support you every step of the way.
    </p>
    
    <p class="recent-posts"><strong>Recent posts</strong></p>
    </div>
    `
}

function buildAboutMePage() {
    const homeContentEl = document.querySelector('.intro')
    homeContentEl.classList.add('remove-bg')
    homeContentEl.innerHTML = `
    <div class="home-container">
    
    <h3>
    Hello! I'm Krishna, the voice behind this blog. 
    </h3>
    
    <p>
    Welcome to my little corner of the internet where I share my passion for mental wellbeing and a healthy lifestyle. I have always been fascinated by the intricate connections between our minds, bodies, and overall wellbeing.
    </p>
    
    <p>
    Experiencing firsthand the transformative power of prioritizing mental health and adopting healthy habits, I felt compelled to help others discover these benefits too. Whether it's through practical tips, personal anecdotes, or in-depth guides, my aim is to provide you with valuable insights and actionable strategies to enhance your life.
    </p>
    
    <p>
    In this blog, you'll find a blend of science-backed information, personal experiences, and expert advice on topics ranging from stress management and positive thinking to nutrition and physical fitness. I believe that small, consistent changes can lead to significant improvements in our mental clarity, emotional stability, and physical vitality.
    </p>
    
    <p>
    When I'm not writing or researching, you can find me experimenting with new healthy recipes, or spending time with loved ones. I am always on the lookout for new ways to live a balanced and fulfilling life, and I'm excited to share my discoveries with you.
    </p>
    
    <p>
    Thank you for joining me on this journey towards a healthier, happier you. Together, we can embrace mental wellbeing and a healthy lifestyle, one step at a time. Feel free to reach out, share your experiences, and let's support each other in this rewarding pursuit.
    </p>
    
    <p>
    Stay well and live fully!
    </p>
    <p class="recent-posts"><strong>Recent posts</strong></p>
    </div>
    `
}

function buildContactPage() {
    const homeContentEl = document.querySelector('.intro')
    homeContentEl.classList.add('remove-bg')
    homeContentEl.innerHTML = `
    <div class="home-container">
    <p>
    I'd love to hear from you! Whether you have questions, feedback, or just want to share your own journey towards mental wellbeing and a healthy lifestyle, feel free to reach out. Your thoughts and experiences are important to me, and I'm always here to help and connect.
    </p>
    
    <p>Get in Touch!!!</p>
    
    <p><strong>Email</strong>: For any inquiries, collaborations, or personal messages, you can email me at ***@***.com. I strive to respond to all emails within 48 hours.
    </p>
    
    <p><strong>Social Media</strong>: Connect with me on social media for daily inspiration, tips, and updates. Feel free to send me a message or tag me in your posts!
    </p>
    
    <div class="contact">
        <div>
        <p><i class="fa-brands fa-square-instagram"></i>: @***</p>
        <p><i class="fa-brands fa-square-facebook"></i>: ***</p>
        </div>
        <div>
        <p><i class="fa-brands fa-square-twitter"></i>: @***</p>
        <p><i class="fa-brands fa-linkedin"></i>: ***</p>
        </div>
    </div>
    <p><strong>Contact Form</strong>:
    You can also fill out the contact form below, and I will get back to you as soon as possible.   
        <form>
            <div>
            <label for="name">Name:</label><br>
            <input type="text" id="name" name="name"><br>
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email"><br>
            </div>
            <div>
            <label for="message">Message:</label><br>
            <textarea id="message" name="message"></textarea><br>
            <input class="submit" type="submit" value="Submit">
            </div>
        </form>
    </p>
    <p>
    Let's Collaborate
    Are you a fellow blogger, mental health advocate, or wellness professional? I'm always open to new collaborations and opportunities to spread the message of mental wellbeing and healthy living. Let's work together to create something amazing.
    </p>
    
    <p>
    Collaborations and Partnerships:
    For collaboration inquiries, please email me at [xxx@xxx.com] with the subject line "Collaboration Inquiry."
    </p>
    
    <p>
    Thank you for visiting my blog. I look forward to connecting with you and supporting each other on this journey towards a healthier, happier life.
    </p>
    
    <p>
    Stay well,
    Krishna
    </p>
    <p class="recent-posts"><strong>Recent posts</strong></p>
    </div>
    `
}

