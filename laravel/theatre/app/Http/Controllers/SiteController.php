<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Repositories\NavbarsRepository;


class SiteController
{
	protected $error = '{"status": "505 Internal Server Error"}';

	protected $n_rep;
	protected $p_rep;
	protected $e_rep;
	protected $pm_rep;

    public function __construct(NavbarsRepository $n_rep) {
    	$this->n_rep = $n_rep;

    }


}
