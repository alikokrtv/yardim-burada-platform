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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sender_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('receiver_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->foreignId('help_request_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('group_id')->nullable()->constrained()->onDelete('cascade');
            $table->text('content');
            $table->enum('type', ['help_request', 'group_chat', 'private'])->default('private');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
            
            $table->index(['sender_id', 'receiver_id']);
            $table->index(['help_request_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
