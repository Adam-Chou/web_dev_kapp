var project_data = [];
$(document).ready(function(){

    //get instagram rss file
    $.ajax({
        url: 'https://rss.app/feeds/kPQAhwkWunYK9PUM.xml?nocache='+ String(Math.floor(Math.random()*1000)),
        type: 'GET',
        data: {
          //no need for any data
        },
        // on success, put data in a variable
        success: function(data, status) {
            //iterate through all of the items in rss file
            $(data).find('item').each(function(index) {
                //reassign for use.
                var $item = $(this);
                // grab the post title
                var title = $item.find('title').text();
                //publication date
                var pubDate = $item.find('pubDate').text();
                //url from media:content
                var media = $item.find('media\\:content, content').attr('url');
            // }
                //create parent div element
                let temp_parent_div = document.createElement('article');
                    //create date
                let temp_date = document.createElement('p');
                temp_date.innerHTML = pubDate;
                temp_date.classList.add('article_title');
                    //create image
                let temp_img = document.createElement('img');
                //grab url for the image
                temp_img.src = media;
                temp_img.style.width ="80%";
                temp_img.style.height ="80%";
                temp_img.classList.add('project_image');
                    //create header
                let temp_header = document.createElement('p');
                temp_header.innerHTML = title;
                temp_header.classList.add('temp_header');
                //append to parent
                temp_parent_div.append(temp_date, temp_img, temp_header);
                
                //store it in project_data
                project_data.push(temp_parent_div.outerHTML);
                
            });
            // Initially load some items after making array
            pagemaker();
           
            // console.log("Project_Data First Element" + " "+ project_data[0]);
        },
        error: function(request, data, status) {
          console.log("An error occured when getting the data");
        }
    });
    var navtext = document.getElementsByClassName("navtext");
    //nav text css function
    for(var i = 0; i< navtext.length; i++){
        navtext[i].addEventListener("mouseover", function(e){
            e.currentTarget.children[0].firstChild.classList.add("nav_font_selected");
            e.currentTarget.children[0].firstChild.classList.remove("nav_font_initial");

        });
        navtext[i].addEventListener("mouseout", function(e){
            e.currentTarget.children[0].firstChild.classList.add("nav_font_initial");
            e.currentTarget.children[0].firstChild.classList.remove("nav_font_selected");
        });
    }
    //nav bar css function
    document.getElementById("reveal_nav").addEventListener("click", function(){
        var colnav= document.getElementById("c_nav");
        //IYT WORKAS OMG YES
        if(colnav.style.display == "block"){
            colnav.style.opacity = "0";
            setTimeout(function() {
                colnav.style.display = "none";
            }, 550);
        }else{
            colnav.style.display = "block";
            setTimeout(function() {
                colnav.style.opacity = "1.0";
            }, 200);
        }
    });
    //login form
    document.getElementById("login_btn").onclick = function(){
        var loginForm = document.getElementById("login_form");
        var micro_form = document.getElementById('micro_form');
        // Toggle hidden class
        loginForm.classList.toggle("hidden"); 
        micro_form.classList.toggle("hidden"); 
        if(loginForm.style.display !== "block" && micro_form.style.display != "none"){
            micro_form.style.opacity = "0";
            loginForm.style.opacity = "1.0";
            setTimeout(function() {
                micro_form.style.display = "none";
                loginForm.style.display = "block";
            }, 550);
        }else{
            // micro_form.style.display = "block";
            micro_form.style.opacity = "1.0";
            // loginForm.style.display = "none";
            loginForm.style.opacity = "0";
            setTimeout(function() {
                micro_form.style.display = "block";
                loginForm.style.display = "none";
            }, 550);
        }
    };

    //guide used for speech recognition API:
        //https://www.youtube.com/watch?v=lq7tFgvdf4k

    //microphone
    var microphone = document.getElementById('microphone');
    var content = document.getElementById('email_writer');
    //using the speech recognition api built into the window library
    var SpeechRecognition = window.SpeechRecoginition || window.webkitSpeechRecognition;
    //create a new speech recognition object
    var recognition = new SpeechRecognition();
    recognition.continous = true;
    var voice_running = false;
    var initial_content;
    //executes when speech starts
    recognition.onstart = function (e){
        //save initial value
        initial_content = content.value;
        voice_running = true;
        console.log('logging your voice now');
    };
    //when it hears something, will get that result and append it to the innerHTML

    recognition.onresult = function(e){
        //holds string of what we said
        var current_text = e.resultIndex;
        var transcript = e.results[current_text][0].transcript;
        //save data we got
       if (content.value.length != 0){
        console.log(initial_content , typeof(transcript));
        content.value = (initial_content + transcript + ' ');
        console.log(content.value);
       }else{
        // content.value = "";
        content.value = transcript;
       }
    };
    recognition.onend = function(e){
        voice_running = false;
        console.log('ending voice recognition');
        microphone.innerHTML = 'Start Recording';
        recognition.stop();
    };

    // Add the listener to the button microphone
    microphone.addEventListener('click', function(e){
        e.preventDefault();
        //check if the voice is already running.
        if(voice_running != true){
            e.currentTarget.innerHTML = 'stop recording';
            recognition.start();
        }else{
            e.currentTarget.innerHTML = 'Start Recording';
            recognition.stop();
        }
    });

    //Make a user interface that generates new pages
    //Make an automatic scroller for each page section
        // Detect when scrolled to bottom.
        project_page.addEventListener('scroll', function() {
            //if it reaches the end of the project document,
            // check if all elements were printed to page
            if(project_page.scrollTop + project_page.clientHeight+10 >= project_page.scrollHeight && project_page.children.length < (project_data.length*2)) {
                //checks length of object
                console.log(project_page.children.length);
                console.log(project_data.length);
                // if(){
                console.log("yessss");
                    // this pagemaker function is not working for some reason
                pagemaker();
                // }
            }
        });
        
    //make a keystroke page scroller so that the user doesnt get caught
    project_page.addEventListener('keypress', function() {
        
    });

    function ValidateEmail(mail){
        //tests if email has valid arguments
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)){
            return (true);
        }
            alert('Please enter a valid email!');
            return (false);
        }

      $('#email_form').on('submit', function(event) {
        event.preventDefault(); // prevent reload

        let email_name = document.getElementById('name').value;
        let email_address = document.getElementById('address').value;
        let email_message = document.getElementById('email_writer').value;
        //if there are no empty fields
        if(email_name.length != 0 && email_address.length != 0 && email_message.length != 0){
            //if the email_address is valid, send data
            if(ValidateEmail(email_address)){
                var temp_params = {
                    from_name: email_name +' : ' + email_address,
                    to_name: 'Adam',
                    message: email_message
                };
                emailjs.send('service_j9ugxeh', 'template_xauovko', temp_params)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    let email_form = document.getElementById('email_form');
                    let conf = document.getElementById('confirmation');
                    email_form.classList.add('hidden');
                    conf.classList.remove('hidden');

                    document.getElementById('name').value = "";
                    document.getElementById('address').value = "";
                    document.getElementById('email_writer').value = "";
        


                }, function(error) {
                    console.log('FAILED...', error);
                });
            }
            //if not, send a warning.
        }else{
            alert('Please fill out all fields on the form please!');
        }
    });
    //   send another form button
      document.getElementById('resend_email').onclick = function(e){
        let email_form = document.getElementById('email_form');
        let conf = document.getElementById('confirmation');
        email_form.classList.remove('hidden');
        conf.classList.add('hidden');
        
      };
});
//Infinite Scroll
        //Expanded example from: https://codepen.io/wernight/details/YyvNoW
        var project_page = document.querySelector('#projects_page');
        var pagenumber = 0;
        function pagemaker(){
            // Append Spacer
            console.log(pagenumber);
            var temp_spacer = document.createElement('div');
                temp_spacer.classList.add('spacer');
                project_page.appendChild(temp_spacer);
    
            //add page
            var temp_page = document.createElement('div');
                temp_page.classList.add('page');
                temp_page.id = 'image_' + String(pagenumber+1);

            var temp_project = document.createElement('div');
                temp_project.classList.add('single_project');
    
            var temp_col_one = document.createElement('div');
                temp_col_one.classList.add('column');
                temp_col_one.id = 'col1';

                //append data from rss feed
                // console.log(project_data); //accessing elements returns undefined
                temp_insta = document.createElement('div');
                temp_insta.classList.add('photo_container');
                // console.log(project_data[pagenumber]);
                temp_insta.innerHTML = project_data[pagenumber];
                temp_col_one.appendChild(temp_insta);
            
            //3d effect with mousemovement, to be used for pictures.
                //source: https://www.youtube.com/watch?v=XK7T3mY1V-w&t=579s
                temp_col_one.addEventListener('mousemove', function(e){
                    e.currentTarget.style.transform = 'translate3d('+String(e.pageX)+',0,'+String(e.pageY)+')';
                    // console.log(e.clientX, e.clientY);
                    let xAxis = ((window.innerWidth/2 - e.pageX)/70);
                    let yAxis = ((window.innerHeight/2 - e.pageY)/75);
                    // temp_insta.style.transform = 'rotateY(' + String(yAxis) + 'deg)';
                    temp_insta.style.transform = 'rotateY(' + String(xAxis) + 'deg) rotateX('+ String(yAxis) +'deg)';
                });
                
            var temp_col_two = document.createElement('div');
                temp_col_two.classList.add('column');
                temp_col_two.id = 'col2';
            //load comments from text files to comments section
            var commentary;
            var temp_comment_holder = document.createElement('div');
            //set interval
            updater(temp_comment_holder,pagenumber+1);
            setInterval(updater,4000,temp_comment_holder,pagenumber+1);
     

            temp_comment_holder.addEventListener('mouseout', function(e){
                console.log("play");
                e.currentTarget.scrollTop = e.currentTarget.scrollHeight;
            });
                
            // });
            
            function updater(target,id){
                console.log('okay this should work');
                $.ajax({
                    //go up one in order to get textfile
                    url: 'data/comments_image'+ String(id) + '.txt?nocache='+ String(Math.floor(Math.random()*1000)),
                    type: 'GET',
                    data: {
                    //no need for any data
                    },
                    // on success, put data in a variable
                    success: function(data, status) {
                        //split data
                        var new_data = data.split("\n");
                        //remove everything
                        while(target.children.length > 0){
                            target.removeChild(target.firstElementChild);
                        }
                        //add class if no class
                        if(!target.classList.contains('comment_holder')){
                            target.classList.add('comment_holder');
                        }
                            //for all data that was split, create elements with new div
                            for(var i = 0; i< new_data.length-1; i++){
                                let temp_comment = document.createElement('div');
                                temp_comment.classList.add('comments');
                                temp_comment.innerText = new_data[i];
                                // console.log(new_data[i]);
                                //add to the element
                                target.appendChild(temp_comment);
                                console.log('noplease');
                                target.scrollTop = target.scrollHeight;
                            }

                        console.log('okayman');

                        // setTimeout(updater,4000);

                    },error: function(request, data, status) {
                        console.log("An error occured when getting the data");
                    }
                });
                console.log('this is repeating');
            }

            //make a form to write to file
            var temp_comment_section = document.createElement('form');
            temp_comment_section.classList.add('comments_section');
            temp_comment_section.action = 'scripts/send_comment.php';
            temp_comment_section.method = 'POST';

            // var user_text = document.createElement('p');
            var user_message = document.createElement('input');
            var message_text = document.createElement('textarea');
            var text_send = document.createElement('input');

            var image_field = document.createElement('input');

            // user_text.innerHTML = 'Name: ';
            user_message.placeholder = 'Username:';
            user_message.type="text";
            //send name
            user_message.name = 'name';
            //message box
            message_text.placeholder = 'Send a comment!';
            message_text.rows = '3';
            message_text.cols = '10';
            //send comment
            message_text.name = 'comment';

            //hides this field from the user.
            image_field.type= 'hidden';
            image_field.name = 'comments_image';
            image_field.value = String(pagenumber+1);
            
            //send button
            text_send.type = 'submit';
            text_send.innerHTML = 'send';
            temp_comment_section.append( user_message, image_field, message_text,text_send);

            //append form after the comments
            temp_col_two.append(temp_comment_holder,temp_comment_section);

            //navbar
            var temp_navbar = document.createElement('div');
                temp_navbar.classList.add('project_navbar');
    
            temp_project.append(temp_col_one,temp_col_two,temp_navbar);
            temp_page.appendChild(temp_project);
            
            //Add to the page
            project_page.appendChild(temp_page);
            pagenumber+=1;
            
        }
        

        