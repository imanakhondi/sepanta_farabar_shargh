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
        Schema::create('tbl_car_introductions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('introduction_id');
            $table->unsignedBigInteger('driver_id');
            $table->unsignedBigInteger('truck_id');
            $table->unsignedBigInteger('tank_id');
            $table->string('registry_date')->default(null);
            $table->string('remittance_name')->default(null);
            $table->string('loading_date')->default(null);
            $table->unsignedBigInteger('loading_tonnage')->default(null);
            $table->string('carrier_unit_usd')->default(null);
            $table->unsignedBigInteger('carrier_total_usd')->default(null);
            $table->string('carrier_unit_irr')->default(null);
            $table->unsignedBigInteger('carrier_total_irr')->default(null);
            $table->unsignedBigInteger('owner_total_usd')->default(null);
            $table->unsignedBigInteger('owner_total_irr')->default(null);
            $table->unsignedBigInteger('carrier_loading_commission')->default(null);
            $table->unsignedBigInteger('forwarding_loading_commission')->default(null);
            $table->string('unloading_date')->default(null);
            $table->unsignedBigInteger('unloading_tonnage')->default(null);
            $table->unsignedBigInteger('difference')->default(null);
            $table->unsignedBigInteger('allowable_deficit')->default(null);
            $table->string('deficit_or_surplus')->default(null);
            $table->string('unloading_receipt')->default(null);
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
        Schema::table('tbl_car_introductions', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
