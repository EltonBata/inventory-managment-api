<?php

namespace Database\Seeders;

use App\Models\Categories;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categories::create([
            'category_name' => 'Clothing & Accessories',
            'category_description' => 'A broad category covering various types of clothing and accessories'
        ]);

        Categories::create([
            'category_name' => 'Software',
            'category_description' => 'Includes computer software and specific types like antivirus and security software'
        ]);

        Categories::create([
            'category_name' => 'Electronics',
            'category_description' => 'Encompasses various electronic products, including mobile phones'
        ]);

        Categories::create([
            'category_name' => 'Food and Beverages',
            'category_description' => 'A key FMCG category including packaged foods and drinks'
        ]);

        Categories::create([
            'category_name' => 'Personal Care',
            'category_description' => 'Includes toiletries and other personal care products'
        ]);

        Categories::create([
            'category_name' => 'Household Goods',
            'category_description' => 'Covers products used in the home, such as cleaning supplies and kitchenware'
        ]);

        Categories::create([
            'category_name' => 'Beauty & Personal Care',
            'category_description' => 'Features products for personal hygiene, cosmetics, skincare, and haircare'
        ]);

        Categories::create([
            'category_name' => 'Home & Kitchen',
            'category_description' => 'Encompasses cookware, appliances, furniture, and home décor'
        ]);

        Categories::create([
            'category_name' => 'Appliances',
            'category_description' => 'Includes large and small kitchen appliances, vacuums, and air conditioners'
        ]);

        Categories::create([
            'category_name' => 'Arts, Crafts & Sewing',
            'category_description' => 'Supplies for painting, drawing, sculpting, sewing, and knitting'
        ]);
    }
}
