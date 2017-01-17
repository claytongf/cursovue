<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__ . '/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$app = new Silex\Application(['debug' => true]);
$app->register(new Silex\Provider\ServiceControllerServiceProvider());

function getBills($index)
{
    $json = file_get_contents(__DIR__ . '/bills.json');
    $data = json_decode($json, true);
    return $data[$index];
}

function findIndexById($index, $id)
{
    $bills = getBills($index);
    foreach ($bills as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function writeBills($index, $bills)
{
    $db = file_get_contents(__DIR__ . '/bills.json');
    $data = json_decode($db, true);
    $data[$index] = $bills;
    $json = json_encode($data);
    file_put_contents(__DIR__ . '/bills.json', $json);
}

function sumBills($index, $done = false)
{
    $bills = getBills($index);
    $sum=0;
    foreach ($bills as $value) {
        if($done){
            if($value['done']){
                $sum += (float)$value['value'];
            }
        } else {
            if(!$value['done']){
                $sum += (float)$value['value'];
            }
        }
    }

    return $sum;
}

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

$app->get('api/bills-pay', function () use ($app) {
    $bills = getBills('bills-pay');
    return $app->json($bills);
});

$app->get('api/bills-pay/total', function () use ($app) {
    return $app->json(['total' => sumBills('bills-pay')]);
});

$app->get('api/bills-pay/total/done', function () use ($app) {
    return $app->json(['total' => sumBills('bills-pay', true)]);
});

$app->get('api/bills-pay/{id}', function ($id) use ($app) {
    $bills = getBills('bills-pay');
    $bill = $bills[findIndexById('bills-pay', $id)];
    return $app->json($bill);
});

$app->post('api/bills-pay', function (Request $request) use ($app) {
    $bills = getBills('bills-pay');
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBills('bills-pay', $bills);
    return $app->json($data);
});

$app->put('api/bills-pay/{id}', function (Request $request, $id) use ($app) {
    $bills = getBills('bills-pay');
    $data = $request->request->all();
    $index = findIndexById('bills-pay', $id);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills('bills-pay', $bills);
    return $app->json($bills[$index]);
});

$app->delete('api/bills-pay/{id}', function ($id) {
    $bills = getBills('bills-pay');
    $index = findIndexById('bills-pay', $id);
    array_splice($bills, $index, 1);
    writeBills('bills-pay', $bills);
    return new Response("", 204);
});

$app->get('api/bills-receive', function () use ($app) {
    $bills = getBills('bills-receive');
    return $app->json($bills);
});

$app->get('api/bills-receive/total', function () use ($app) {
    return $app->json(['total' => sumBills('bills-receive')]);
});

$app->get('api/bills-receive/total/done', function () use ($app) {
    return $app->json(['total' => sumBills('bills-receive', true)]);
});

$app->get('api/bills-receive/{id}', function ($id) use ($app) {
    $bills = getBills('bills-receive');
    $bill = $bills[findIndexById('bills-receive', $id)];
    return $app->json($bill);
});

$app->post('api/bills-receive', function (Request $request) use ($app) {
    $bills = getBills('bills-receive');
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBills('bills-receive', $bills);
    return $app->json($data);
});

$app->put('api/bills-receive/{id}', function (Request $request, $id) use ($app) {
    $bills = getBills('bills-receive');
    $data = $request->request->all();
    $index = findIndexById('bills-receive', $id);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills('bills-receive', $bills);
    return $app->json($bills[$index]);
});

$app->delete('api/bills-receive/{id}', function ($id) {
    $bills = getBills('bills-receive');
    $index = findIndexById('bills-receive', $id);
    array_splice($bills, $index, 1);
    writeBills('bills-receive', $bills);
    return new Response("", 204);
});

$app->match("{uri}", function($uri){
    return "OK";
})
    ->assert('uri', '.*')
    ->method("OPTIONS");


$app->run();