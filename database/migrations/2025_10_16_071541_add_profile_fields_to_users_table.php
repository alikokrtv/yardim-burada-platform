<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable();
            $table->string('city')->nullable();
            $table->string('district')->nullable();
            $table->text('bio')->nullable();
            $table->string('profile_image')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->integer('xp')->default(0);
            $table->integer('level')->default(1);
            $table->decimal('rating', 3, 2)->default(0);
            $table->boolean('is_premium')->default(false);
            $table->json('interests')->nullable();
            $table->timestamp('last_active_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'phone', 'city', 'district', 'bio', 'profile_image',
                'latitude', 'longitude', 'xp', 'level', 'rating',
                'is_premium', 'interests', 'last_active_at'
            ]);
        });
    }
};
