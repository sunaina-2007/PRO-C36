var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var fedTime;
//create feed and lastFed variable here
var feed,lastfeed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

addFood = createButton("Add Food");
addFood.position(800,92);
addFood.mousePressed(addFoods);
}

function draw() {
  background("green");
  foodObj.display();

  //write code to read fedtime value from the database 
  fedtime=database.ref('FeedTime')
 fedtime.on("value",function(data){ lastfeed=data.val(); });
 if(lastfeed>=12)
 {
   text("Last Feed :" + lastfeed%12 + "PM", 150,100);
 }else if(lastfeed ===0 )
 {
   text("Last Feed : 12 AM" , 150,100)
 }else
 {
   text("Last Feed :" + lastfeed + "AM", 150,100);
 }

 drawSprites();
}
 

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}




  //write code here to update food stock and last fed time
  function feedDog(){
    dog.addImage(happyDog);
  
    var food_stock_val = foodObj.getFoodStock();
 if(food_stock_val <= 0){
foodObj.updateFoodStock(food_stock_val *0);  
 }
 else{
  foodObj.updateFoodStock(food_stock_val -1)   
 }

    //foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    //gameState:"Hungry"
    })
  }


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
