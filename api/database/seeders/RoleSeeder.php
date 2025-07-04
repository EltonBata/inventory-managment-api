<?php

namespace Database\Seeders;

use App\Models\Roles;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Roles::create([
            'role_name' => 'admin'
        ]);

        Roles::create([
            'role_name' => 'customer'
        ]);

        Roles::create([
            'role_name' => 'provider'
        ]);
    }
}
