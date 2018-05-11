<?php
$file = realpath(__DIR__ . '/..') . "/db.php" ;
include $file;
global $conn;
?>

<?php
if (isset($_POST)){

}

?>


<?php
$file = realpath(__DIR__ . '/..') . "/db.php" ;
include $file;
global $conn;
    
    try {
        $sql = "SELECT * FROM interns_data WHERE username='{$_GET['id']}'";
    
        $q = $conn->query($sql);
        $q->setFetchMode(PDO::FETCH_ASSOC);
        $data = $q->fetch();
    } catch (PDOException $e) {
        throw $e;
    }

    $name = $data['name'];
    $username = $data['username'];
    $image = $data['image_filename'];

    try {
        $sql = 'SELECT * FROM secret_word';
        $q= $conn->query($sql);
        $q->setFetchMode(PDO::FETCH_ASSOC);
        $data = $q->fetch();
    } catch (PDOException $e) {
        throw $e;
    }
    $secret_word = $data['secret_word'];
?>

<!DOCTYPE html>
<html>
<head>
    <title>HNG 4.0 | <?php echo $name; ?></title>
    
	 <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

	<!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<style type="text/css">
		
		.center{
			margin:auto;
		}
		.Lrow{
			margin-right:  300px;
			margin-left:  300px
		}
		.item{
			margin:.1em;
            display: inline-block;
		}
		#bot-overlay {
			position: fixed; /* Sit on top of the page content */
			display: block; /* Hidden by default */
			width: 100%; /* Full width (cover the whole page) */
			height: 100%; /* Full height (cover the whole page) */
			top: 0; 
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0,0,0,0.5); /* Black background with opacity */
			z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
			cursor: pointer; /* Add a pointer on hover */
			padding:5px;
		}
		#chat-display{
			margin:auto;
			background-color: cornsilk;
			width: 50%;
			height:70%;
			
		}
		
	</style>
</head>
<body class="blue lighten-3">
	<div class="container" id="app">
	   
	    <div class="card" >
		    <div class="card-image waves-effect waves-block waves-light">
				<img src="<?php echo $image; ?>" alt="<?php echo $name; ?>" class=" activator" height="">
		    </div>
		    <div class="card-content">
		    <div class="center-align">
		     <span class="card-title grey-text text-darken-4"><h3><?php echo $name; ?></span>
		      <p>A Python/PHP enthusiast. </p>
		      <p>A Programming Hobbyist</p>
		  </div>
		      <div><h5 class="center-align">Connect with me on:</h5></div>
		     <div class="Lrow">
		     	<ul class="list-inline text-center">
		      <li class="list-inline-item"> <a href="https://twitter.com/hyunglere"><i class="fa fa-twitter fa-lg item"></i></a></li>
		      <li class="list-inline-item"><a href="https://www.facebook.com/olaitan.ibrahim.923"><i class="fa fa-facebook fa-lg item"></i></a></li>
		      <li class="list-inline-item"><a href="https://www.linkedin.com/in/ibrahim-olaitan-562a24160/"><i class="fa fa-linkedin fa-lg item"></i></a></li>
		      <li class="list-inline-item"><a href="https://www.instagram.com/hyunglere/"><i class="fa fa-instagram fa-lg item"></i></a> </li>
		      <li class="list-inline-item"><a href="https://www.github.com/hyunglere/"><i class="fa fa-github fa-lg item"></i></a></li>
		  </ul>
		  	</div>
			  <button class="btn btn-default" v-on:click="togglebot">Chat with the Bot</button>
		    </div>
		    
		  </div>
		  <div id="bot-overlay" v-show="bot">
			  <div class="row"><span class="col s4"></span><button class="btn red waves-effect waves-light col s4" v-on:click="togglebot">Close the Bot</button><span class="col s4"></span></div>
				
			<div id="chat-display">
				<div style="overflow-y:scroll; height:80%;position : relative; bottom:0;" id="targ">
						<ul class="collection" v-for="chat in chats"> 
								<li class="collection-item avatar">
									<img v-if="chat.sender == 'bot'" src="http://pluspng.com/img-png/png-you-iu-500.png" alt="You" class="circle">
									<img v-if="chat.sender =='you'" src="https://botlist.co/system/BotList/Bot/logos/000/003/817/medium/Quriobot-chatbot.jpg" alt="Bot" class="circle">
								  <span class="title">{{chat.sender}}</span>
								  <p>{{chat.message}}</p>
							
								</li>
							</ul>
								
				</div>
				<input type="text" v-model="question" placeholder="Type your message here">
				<button class="btn btn-primary waves-effect waves-light" v-on:click="sendUserQuestion" v-bind:class="{disabled:isDis}">Send</button>
			</div>  
			
		  </div>
	</div>
	

    <!-- Compiled and minified JavaScript -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	<script>
		var element = document.getElementById(" element.scrollTop = element.scrollHeight;")
		
		var app = new Vue({
		el: '#app',
		data: {
			bot:false,
			question:"",
			chats: [
				{sender:"bot",message:"hi, welcome to my interface"},
				{sender:"bot", message:"reply help to get the list of commands available"}
			],
			
		},
		computed:{
			isDis: function(){
				return this.question === ""
			}
		},
		methods:{
			togglebot:function(){
				this.bot = !this.bot
			},
			sendUserQuestion:function(){
				if(this.question !== ""){chat = {sender:"you",
					message:this.question
					}
					this.chats.push(chat)
					this.question = ""
					var elem = document.getElementById("targ")
					elem.scrollTop = elem.scrollHeight + 50
				}
			}

		}
		})
		setInterval(function(){
			elem = document.getElementById("targ")
			elem.scrollTop = elem.scrollHeight
		},1000);
	</script>
</body>
</html>

