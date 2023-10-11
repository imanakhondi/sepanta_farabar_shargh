<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_repairs', function (Blueprint $table) {
            $table->id();
            $table->string('repair_date');
            $table->unsignedBigInteger('cost');
            $table->text('description');
            $table->unsignedBigInteger('tank_id');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_repairs', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
