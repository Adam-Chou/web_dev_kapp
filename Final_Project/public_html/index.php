<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adam Chou</title>
    <?php
        if(!isset($_COOKIE['login'])){
    ?>
        <link rel="stylesheet" type="text/css" href="scss/dist/master.css"/>
    <?php
        }else{
    ?>
        <link rel="stylesheet" type="text/css" href="scss/dist/admin.css"/>
    <?php
        }
    ?>
    <!-- p5 link -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/p5.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/addons/p5.sound.min.js"></script>
    <style>
        /* #about_page{
            display: none;
        } */
    </style>

</head>
<body>
    <?php
        if(!isset($_COOKIE['login'])){
    ?>
    <!-- <div> -->
        <div id="mobile_nav">
            <div id="reveal_nav"><div id="inner_nav"></div></div>
            <nav class="c_navigation hidden" id="c_nav">
                <div class="navtext"><a href="#intro_page"><h1 class="nav_font_initial">Home</h1></a></div>
                <!-- &nbsp;&nbsp; -->
                <div class="navtext"><a href="#projects_page"><h1 class="nav_font_initial">Projects</h1></a></div>
                <!-- &nbsp;&nbsp; -->
                <div class="navtext"><a href="#about_page"><h1 class="nav_font_initial">About</h1></a></div>
                <!-- &nbsp;&nbsp; -->
                <div class="navtext"><a href="#contact_page"><h1 class="nav_font_initial">Contact</h1></a></div>
            </nav>
        </div>
        <div class="page" id="intro_page">
            <div id="intro_content">
                <h1 id="login_btn">Adam Chou</h1>
                <div id="content">
                    <div id="micro_form">
                        <a href="#about_page"><span id="writer"><p>In pursuit of knowledge</p></span></a>
                    </div>
                        <div class="hidden" id="login_form">
                            <form action="scripts/admin_login.php" method="POST">
                                <p>Username:</p><input type="text" name="username">
                                <p>Password:</p><input type="text" name="password">
                                <br><br><input type="submit">
                            </form>
                        </div>
                </div>
            </div>
            <span id="drawing_board">
                <script src="scripts/sketch.js"></script>
            </span>

        </div>
        <!-- About page, initial -->
        <div class="page" id="about_page">
            <div class="spacer"></div>
            <content>
                <div class="h_navigation" id="h_navbar">
                    <nav>
                        <div class="navtext"><a href="#intro_page"><h1 class="nav_font_initial">Home</h1></a></div>
                        &nbsp;&nbsp;
                        <div class="navtext"><a href="#projects_page"><h1 class="nav_font_initial">Projects</h1></a></div>
                        &nbsp;&nbsp;
                        <div class="navtext"><a href="#about_page"><h1 class="nav_font_initial">About</h1></a></div>
                        &nbsp;&nbsp;
                        <div class="navtext"><a href="#contact_page"><h1 class="nav_font_initial">Contact</h1></a></div>
                    </nav>
                </div>
                <div class="about_content" id="AC">
                    <img class="picture" src='image/profile.jpg'>
                    <div class="about_text">
                        <p>I am a current Senior studying Media, Culture and Communications at NYU.<br>Thanks for checking out my page!</p>
                    </div>
                </div>
            </content>
            <!-- <div class="closer"><a href="#projects_page"><p>< -- Look Down Below !! -- ></p></a></div> -->
            <div class="spacer"></div>
        </div>
        <!-- Projects Tab -->
        <div id="projects_page"><?php 
        if($_GET['commenterror'] == 'TRUE'){        
        ?>
            <script>
                //work on this
                alert("Comment Fields are incomplete!")
            </script>
        <?php 
        }?></div>
            <div class="spacer"></div>
        <div class="page" id="contact_page">
            <div style="margin: auto; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <div class="h_navigation" id="h_navbar">
                    <nav>
                        <div class="navtext"><a href="#intro_page"><h1 class="nav_font_initial">Home</h1></a></div>
                        &nbsp;&nbsp;
                        <div class="navtext"><a href="#projects_page"><h1 class="nav_font_initial">Projects</h1></a></div>
                        &nbsp;&nbsp;
                        <div class="navtext"><a href="#about_page"><h1 class="nav_font_initial">About</h1></a></div>
                        &nbsp;&nbsp;
                        <div class="navtext"><a href="#contact_page"><h1 class="nav_font_initial">Contact</h1></a></div>
                    </nav>
                </div>
                <!-- Make a contact form, send to php -->
                <div id="confirmation" class="hidden"><h3>Your e-mail was sent!</h3><button id="resend_email">Send another Email?</button></div>

                <form id="email_form">
                    <p>Name:</p>
                    <input type="text" id="name">
                    <p>Email:</p>
                    <input type="text" id="address">
                    <p>Message:</p>
                    <textarea placeholder="send me a message!" id="email_writer" rows="10"cols="50"></textarea>
                    <!-- Microphone -->
                    <button id="microphone">Microphone</button>
                    <br><br>
                    <!-- Submit button -->
                    <input id="send_email_btn" type="submit">
                </form>
            </div>
        </div>
        <?php
            }else{
                if($_COOKIE['login'] == 'admin'){
        ?>
                <div class='centered'>
                    <div class="col">
                        <h2>Admin Comment Editor</h2>
                        <form class="admin_form" action='scripts/comment_edit.php' method="POST">
                            <select id="image_classifier" name="image"></select>
                            <textarea id="comments_section" name="comments"></textarea>
                            <input type="submit"></input>
                        </form>
                        <button id="sign_out_btn" style="margin: 10px;">Sign out</button>
                    </div>
                    <div class="col">
                        <form class="user_log" action='scripts/admin_edit.php' method="POST">
                            <h2>Admin Log</h2>
                            <textarea id="admin_userlog" name="userlog"></textarea>
                            <input type='submit'>
                        </form>
                    </div>  
                </div>
                <script src="scripts/sketch.js"></script>
        <?php
                }else{
                    setCookie('login','',time()-32141241);
                    header("Location: index.php");
                    exit();
                }
            }
        ?>
</body>
<!-- Import jquery -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <!-- Import email.js -->
    <script type="text/javascript"src="https://cdn.jsdelivr.net/npm/emailjs-com@2/dist/email.min.js"></script>
    <script type="text/javascript">
    (function() {
    emailjs.init(String(<?php include('scripts/apikey.php'); echo json_encode($key);?>));
    })();
    </script>
    <?php
     if(isset($_COOKIE['login'])){
        if($_COOKIE['login'] == 'admin'){
    
    ?>
        <script>    
        $(document).ready(function(){
            var num_elements = 0;
            //get instagram rss file
            $.ajax({
                url: 'https://rss.app/feeds/kPQAhwkWunYK9PUM.xml'+ '?nocache=' + Math.floor(Math.random() * 1000),
                type: 'GET',
                data: {
                //no need for any data
                },
                // on success, put data in a variable
                success: function(data, status) {
                    //iterate through all of the items in rss file
                    $(data).find('item').each(function(index) {
                    //add one for every element.
                        num_elements+=1;
                    });
                    var parent = document.getElementById('image_classifier');
                    //make a select tag for each
                    for(var i = 1; i<num_elements+1; i++){
                        
                        var temp_option = document.createElement('option');
                        
                        temp_option.setAttribute("value", String(i));
                        var text = document.createTextNode("Image"+String(i));
                        temp_option.appendChild(text);
                        console.log(temp_option)
                        parent.appendChild(temp_option);
                    }
                    $.ajax({
                    //go up one in order to get textfile
                    url: 'data/comments_image1.txt' + '?nocache=' + Math.floor(Math.random() * 1000),
                    type: 'GET',
                    data: {
                    //no need for any data
                    },
                    // on success, put data in a variable
                    success: function(data, status) {
                        console.log(data)
                        document.getElementById('comments_section').value = data
                        update();
                    }
                });
                    
                },
                error: function(request, data, status) {
                    console.log("An error occured when getting the data");
                }
            });
        });
            document.getElementById('image_classifier').onchange = function(e){
                update();
            }
            function update(){
                var image_num = document.getElementById('image_classifier');
                
                console.log('im working')
                $.ajax({
                    //go up one in order to get textfile
                    url: 'data/comments_image'+ String(image_num.value) + '.txt'+ '?nocache=' + Math.floor(Math.random() * 1000),
                    type: 'GET',
                    data: {
                    //no need for any data
                    },
                    // on success, put data in a variable
                    success: function(data, status) {
                        document.getElementById('comments_section').value = data
                        setTimeout(update, 10000);
                        document.getElementById('comments_section').scrollTop = document.getElementById('comments_section').scrollHeight
                    }
                });
            }
            function user_update(){
                $.ajax({
                    //go up one in order to get textfile
                    url: 'data/admin_log.txt?nocache=' + Math.floor(Math.random() * 1000),
                    type: 'GET',
                    data: {
                    //no need for any data
                    },
                    // on success, put data in a variable
                    success: function(data, status) {
                        document.getElementById('admin_userlog').value = data
                        document.getElementById('admin_userlog').scrollTop = document.getElementById('admin_userlog').scrollHeight
                    }
                });
            }
            user_update();
            setTimeout(user_update,4000);

            document.getElementById('sign_out_btn').onclick = function(e){
                console.log("okay")
                document.cookie = 'login= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/ ';
                //reload the page
                location.reload();
            }
        </script>
    <?php
        }else{
            setCookie('login','',time()-32141241);
            header("Location: index.php");
            exit();
        }
    }else{?>
            <script src="scripts/client.js"></script>
    <?php
    }?>
</html>