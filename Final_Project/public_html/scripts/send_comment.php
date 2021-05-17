 <?php
 include('config.php');

 if($_POST['name'] != NULL && $_POST['comment']!= NULL && $_POST['comments_image']!= NULL){
    $data = array('name' => $_POST['name'],'comment' => $_POST['comment'], 'num_image' => $_POST['comments_image']);
    
    $file_path = $path .'/comments_image'. strval($data['num_image']) . '.txt';
    file_put_contents( $file_path, $data['name'] . ': '.  $data['comment']. "\n", FILE_APPEND);
    
    header("Location: ../index.php#image_". $data['num_image']);
    exit();

 }else{
    header("Location: ../index.php?commenterror=TRUE");
    exit();
 } 
 ?>

 