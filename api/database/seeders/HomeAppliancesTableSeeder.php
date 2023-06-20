<?php

namespace Database\Seeders;

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

        $nomesEletrodomesticos = [
            'Geladeira',
            'Fogão',
            'Máquina de Lavar',
            'Micro-ondas',
            'Liquidificador',
            'Aspirador de Pó',
            'Freezer',
            'Secadora de Roupas',
            'Lava-Louças',
            'Forno Elétrico',
            'Cafeteira',
            'Batedeira',
            'Fritadeira Elétrica',
            'Panela Elétrica',
            'Sanduicheira',
            'Chaleira Elétrica',
            'Multiprocessador',
            'Ventilador',
            'Ar-Condicionado',
            'Depurador de Ar',
            'Exaustor',
            'Aquecedor',
            'Umidificador de Ar',
            'Ferro de Passar',
            'Torradeira',
            'Grill',
            'Espremedor de Frutas',
            'Mixer',
            'Yogurteira',
            'Batedeira Planetária',
            'Máquina de Costura',
            'Enceradeira',
            'Máquina de Café Expresso',
            'Churrasqueira Elétrica',
            'Máquina de Gelo',
            'Bebedouro',
            'Desumidificador',
            'Purificador de Água',
            'Esquentador',
            'Escova Alisadora',
            'Robô Aspirador',
            'Climatizador de Ar',
            'Filtro de Água',
            'Afiador de Facas',
            'Triturador de Alimentos',
            'Faca Elétrica',
            'Amaciador de Carne',
            'Máquina de Crepe',
            'Crepeira',
            'Fogão Elétrico',
            'Grill Elétrico',
            'Lixeira Automática',
            'Liquidificador Portátil',
            'Balança de Cozinha',
            'Máquina de Cerveja',
            'Aquecedor de Água',
            'Air Fryer',
            'Máquina de Pão',
            'Processador de Alimentos',
            'Máquina de Popcorn',
            'Máquina de Sorvete',
            'Desidratador de Alimentos',
            'Moedor de Café',
            'Espremedor de Alho',
            'Fondue Elétrico',
            'Churrasqueira a Gás',
            'Aquecedor de Ambiente',
            'Liquidificador Profissional',
            'Cortador de Legumes',
            'Balança Digital',
            'Yogurteira Elétrica',
            'Máquina de Suco',
            'Máquina de Popcakes',
            'Máquina de Raspadinha',
            'Climatizador Portátil',
            'Ferro a Vapor',
            'Máquina de Biscoitos',
            'Prensa de Hambúrguer',
            'Grelhador Elétrico',
            'Lavadora de Alta Pressão',
            'Descascador de Legumes',
            'Espremedor de Cana',
            'Cortador de Frios',
            'Picadora de Carne',
            'Secador de Cabelo',
            'Carrinho de Bebê Elétrico',
            'Hidromassagem Portátil',
            'Panela de Pressão Elétrica',
            'Máquina de Cortar Cabelo',
            'Escova de Dentes Elétrica',
            'Climatizador de Vinho',
        ];


        $voltages = [110, 220];
        $brands = ['Electrolux', 'Brastemp', 'Fischer', 'Samsung', 'LG'];

        $quantityRecords = $this->command->ask('How many records do you want to insert?', 50);

        for ($i = 1; $i <= $quantityRecords; $i++) {
            $nome = $faker->randomElement($nomesEletrodomesticos);
            $descricao = $faker->sentence;
            $voltagem = $faker->randomElement($voltages);
            $marca = $faker->randomElement($brands);

            HomeAppliance::create([
                'name' => $nome,
                'description' => $descricao,
                'voltage' => $voltagem,
                'brand' => $marca,
            ]);
        }
    }
}
