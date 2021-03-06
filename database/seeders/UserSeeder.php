<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert(
            [
                'name' => 'Sistema',
                'username' => 'system',
                'email' => 'postmaster@localhost',
                'password' => Hash::make('system')
            ]
        );
        DB::table('users')->insert(
            [
                'name' => 'Administrador',
                'username' => 'admin',
                'email' => 'admin@localhost',
                'password' => Hash::make('admin')
            ]
        );
    }
}
