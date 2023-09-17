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
        Schema::create('tbl_introductions', function (Blueprint $table) {
            $table->id();
            $table->string('introduction_no');
            $table->string('introduction_date');
            $table->unsignedBigInteger('bar_owner_id');
            $table->unsignedBigInteger('start_point_id');
            $table->unsignedBigInteger('end_point_id');
            $table->unsignedBigInteger('owner_unit_usd');
            $table->unsignedBigInteger('owner_unit_irr');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('bar_owner_id')->references('id')->on('tbl_bar_owners');
            $table->foreign('start_point_id')->references('id')->on('tbl_cities');
            $table->foreign('end_point_id')->references('id')->on('tbl_cities');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_introductions', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
