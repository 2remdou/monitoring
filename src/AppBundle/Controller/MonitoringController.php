<?php
/**
 * Created by PhpStorm.
 * User: mdoutoure
 * Date: 09/07/2015
 * Time: 08:43
 */

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use FOS\RestBundle\Controller\Annotations\Route;

class MonitoringController extends Controller {
    /**
     * @Route("/", name="homepage", options={"expose"=true})
     */
    public function indexAction()
    {
        return $this->render('AppBundle::index.html.twig');
    }
} 