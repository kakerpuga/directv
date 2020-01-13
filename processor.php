<?php
//get json

$input = file_get_contents('php://input');

//get into an array

$contact = json_decode($input,true);

//sanitize strings

$first_name=$contact["first_name"];
$last_name=$contact["last_name"];
$email=$contact["phone_fax"];
$phone_mobile=$contact["phone_mobile"];
$primary_address_state=$contact["primary_address_state"];
$primary_address_city=$contact["primary_address_city"];
$primary_address_street=$contact["primary_address_street"];
$primary_address_postalcode=$contact["primary_address_postalcode"];
$lead_source=$contact["lead_source"];
$assigned_user_id=$contact["assigned_user_id"];
$dni_c=$contact["dni_c"];
$tarjeta_c=$contact["tarjeta_c"];
$plan_c=$contact["plan_c"];
$pais_c=$contact["pais_c"];
$provincia_c=$contact["provincia_c"];
$estado_venta_c=$contact["estado_venta_c"];
$sub_estado_venta_c=$contact["sub_estado_venta_c"];
$producto_c=$contact["producto_c"];
$provincia_c=$contact["provincia_c"];
$utmContent=$contact["utmContent"];
$utmMedium=$contact["utmMedium"];
$utmSource=$contact["utmSource"];
$utmTerm=$contact["utmTerm"];

$fullName=$first_name." ".$last_name;

//define timezone

date_default_timezone_set('UTC');

//create generation date of lead

$dateCreated = date("Y-m-d H:i:s");

//generate an uid for lead

function generate_uuid() {
    return sprintf( '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ),
        mt_rand( 0, 0xffff ),
        mt_rand( 0, 0x0fff ) | 0x4000,
        mt_rand( 0, 0x3fff ) | 0x8000,
        mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
    );
}

$uid=generate_uuid();

//POST to API

$APIkey='c78dfe328fa2a032e148286ad54cbe8c';

//API Url
$APIurl = 'https://'.$APIkey.'@api.masterdealer.co/contacts';
 
//Initiate cURL.
$ch = curl_init($APIurl);
 
//The JSON data.
$jsonData = array(
    'id' => $uid,
    'first_name' => $fullName,
    'phone_mobile' => $phone_mobile,
    'primary_address_state' => $primary_address_state,
    'primary_address_city' => $primary_address_city,
    'primary_address_street' => $primary_address_street,
    'primary_address_postalcode' => $primary_address_postalcode,
    'lead_source' => $lead_source,
    'assigned_user_id' => $assigned_user_id,
    'dni_c' => $dni_c,
    'tarjeta_c' => $tarjeta_c,
    'plan_c' => $plan_c,
    'pais_c' => $pais_c,
    'provincia_c' => $provincia_c,
    'date_entered' => $dateCreated,
    'estado_venta_c' => $estado_venta_c,
    'sub_estado_venta_c' => $sub_estado_venta_c,
    'phone_fax' => $email,
    'producto_c' => $producto_c,
    'utm_campaign_c' => $utmCampaign,
    'utm_source_c' => $utmSource,
    'utm_content_c' => $utmContent,
    'utm_medium_c' => 'LandingPage',
    'utm_term_c' => $utmTerm
);
 
//Encode the array into JSON.
$jsonDataEncoded = json_encode($jsonData);
 
//Tell cURL that we want to send a POST request.
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

//Attach our encoded JSON string to the POST fields.
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataEncoded);
 
//Set the content type to application/json
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json')); 
 
//Execute the request
$result = curl_exec($ch);

$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

if($httpcode=="201"){

  echo "success";

}else{

  echo "HTTP Code: ".$httpcode."|| Result: ".$result;

}


?>
