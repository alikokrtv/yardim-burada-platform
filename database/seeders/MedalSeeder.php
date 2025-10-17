<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MedalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $medals = [
            // Bronz Madalyonlar
            [
                'name' => 'İlk Adım',
                'description' => 'İlk yardım isteğinizi oluşturdunuz',
                'icon' => '🪙',
                'color' => '#CD7F32',
                'requirement_points' => 5,
                'type' => 'bronze',
                'category' => 'genel'
            ],
            [
                'name' => 'Yardımsever',
                'description' => '5 yardım isteğine yanıt verdiniz',
                'icon' => '🤝',
                'color' => '#CD7F32',
                'requirement_points' => 50,
                'type' => 'bronze',
                'category' => 'yardımsever'
            ],
            [
                'name' => 'Topluluk Üyesi',
                'description' => 'İlk gruba katıldınız',
                'icon' => '👥',
                'color' => '#CD7F32',
                'requirement_points' => 3,
                'type' => 'bronze',
                'category' => 'topluluk'
            ],

            // Gümüş Madalyonlar
            [
                'name' => 'Deneyimli Yardımcı',
                'description' => '15 yardım isteğine yanıt verdiniz',
                'icon' => '🥈',
                'color' => '#C0C0C0',
                'requirement_points' => 150,
                'type' => 'silver',
                'category' => 'yardımsever'
            ],
            [
                'name' => 'Etkinlik Katılımcısı',
                'description' => '5 etkinliğe katıldınız',
                'icon' => '🎉',
                'color' => '#C0C0C0',
                'requirement_points' => 25,
                'type' => 'silver',
                'category' => 'etkinlik'
            ],
            [
                'name' => 'Hayvansever',
                'description' => '10 hayvan yardım isteğine yanıt verdiniz',
                'icon' => '🐕',
                'color' => '#C0C0C0',
                'requirement_points' => 100,
                'type' => 'silver',
                'category' => 'hayvansever'
            ],

            // Altın Madalyonlar
            [
                'name' => 'Usta Yardımcı',
                'description' => '30 yardım isteğine yanıt verdiniz',
                'icon' => '🥇',
                'color' => '#FFD700',
                'requirement_points' => 300,
                'type' => 'gold',
                'category' => 'yardımsever'
            ],
            [
                'name' => 'Topluluk Lideri',
                'description' => '3 grup oluşturdunuz',
                'icon' => '👑',
                'color' => '#FFD700',
                'requirement_points' => 200,
                'type' => 'gold',
                'category' => 'liderlik'
            ],
            [
                'name' => 'Çevre Dostu',
                'description' => '20 çevre yardım isteğine yanıt verdiniz',
                'icon' => '🌱',
                'color' => '#FFD700',
                'requirement_points' => 200,
                'type' => 'gold',
                'category' => 'çevre'
            ],

            // Elmas Madalyonlar
            [
                'name' => 'Efsanevi Yardımcı',
                'description' => '50 yardım isteğine yanıt verdiniz',
                'icon' => '💎',
                'color' => '#B9F2FF',
                'requirement_points' => 500,
                'type' => 'diamond',
                'category' => 'yardımsever'
            ],
            [
                'name' => 'Topluluk Kahramanı',
                'description' => '1000 XP kazandınız',
                'icon' => '🦸',
                'color' => '#B9F2FF',
                'requirement_points' => 1000,
                'type' => 'diamond',
                'category' => 'kahraman'
            ],

            // Özel Madalyonlar
            [
                'name' => 'Hızlı Yardımcı',
                'description' => 'Bir yardım isteğine 1 saat içinde yanıt verdiniz',
                'icon' => '⚡',
                'color' => '#FF6B6B',
                'requirement_points' => 50,
                'type' => 'special',
                'category' => 'hız'
            ],
            [
                'name' => 'Gece Kuşu',
                'description' => 'Gece saatlerinde 5 yardım isteğine yanıt verdiniz',
                'icon' => '🦉',
                'color' => '#4ECDC4',
                'requirement_points' => 100,
                'type' => 'special',
                'category' => 'zaman'
            ]
        ];

        foreach ($medals as $medal) {
            \App\Models\Medal::create($medal);
        }
    }
}
