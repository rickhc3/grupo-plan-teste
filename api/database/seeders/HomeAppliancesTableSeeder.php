<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\HomeAppliance;

class HomeAppliancesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        $voltages = [110, 220];

        $brands = ['Electrolux', 'Brastemp', 'Fischer', 'Samsung', 'LG'];

        $quantityRecords = $this->command->ask('How many records do you want to insert?', 50);

        foreach (range(1, $quantityRecords) as $index) {
            HomeAppliance::create([
                'name' => $faker->word,
                'description' => $faker->sentence,
                'voltage' => $faker->randomElement($voltages),
                'brand' => $faker->randomElement($brands),
            ]);
        }
    }
}
