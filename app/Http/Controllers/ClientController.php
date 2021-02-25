<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('clients', ['clients' => Client::all()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => [
                'required',
                'min:2',
                Rule::unique('clients')->where('phone', $request->phone),
            ],
            'phone' => [
                'required',
                'min:10',
                Rule::unique('clients')->where('name', $request->name),
            ],
            'address' => ['required', 'min:4'],
            'addr_number' => ['required', 'numeric'],
        ]);

        $client = new Client($request->only(['name', 'phone', 'address', 'addr_number', 'addr_complement']));
        $client->save();
        return Redirect::route('clients.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function show(Client $client)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function edit(Client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Client $client)
    {
        $validation = array();
        if ($request->name != $client->name || $request->phone != $client->phone) {
            $validation['name'] = [
                'required',
                'min:2',
                Rule::unique('clients')->where('phone', $request->phone),
            ];
            $validation['phone'] = [
                'required',
                'min:10',
                Rule::unique('clients')->where('name', $request->name),
            ];
        }

        if ($request->address != $client->address || $request->addr_number != $client->addr_number) {
            $validation['address'] = ['required', 'min:4'];
            $validation['addr_number'] = ['required', 'numeric'];
        }

        if (count($validation) > 0 || $request->addr_complement != $client->addr_complement) {
            $request->validate($validation);
            $client->update($request->only(['name', 'phone', 'address', 'addr_number', 'addr_complement']));
        }

        return Redirect::route('clients.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(Client $client)
    {
        //
    }
}
