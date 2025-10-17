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
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('city');
            $table->string('category');
            $table->foreignId('owner_id')->constrained('users')->onDelete('cascade');
            $table->string('cover_image')->nullable();
            $table->json('rules')->nullable();
            $table->boolean('is_public')->default(true);
            $table->integer('member_count')->default(0);
            $table->timestamps();
            
            $table->index(['city', 'category']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groups');
    }
};
