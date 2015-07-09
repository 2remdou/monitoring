<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\SerializedName;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Indicateur
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\IndicateurRepository")
 * @ExclusionPolicy("all")
 * @UniqueEntity(fields={"libelleIndicateur"},message="Ce libelle indicateur existe deja")
 */

class Indicateur
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Expose()
     * @SerializedName("id")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="libelleIndicateur", type="string", length=255)
     * @Assert\NotBlank(message="L'indicateur doit avoir un nom", groups={"registration"})
     * @ORM\Column(name="libelleIndicateur", type="string", length=255)
     * @Assert\NotBlank(message="L'indicateur doit avoir un libelle",groups={"common"})
     * @Expose()
     * @SerializedName("libelleIndicateur")
     */

    private $libelleIndicateur;

    /**
     * @var Doctrine\Common\Collections\Collection $detailIndicateurs
     *
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\DetailIndicateur", mappedBy="indicateur", cascade={"remove"})
     *
     */
    private $detailIndicateurs;

    /**
     * @var TypeIndicateur $typeIndicateur
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\TypeIndicateur", inversedBy="indicateur")
     * @Expose()
     * @ORM\JoinColumn(nullable=false)
     * @SerializedName("typeIndicateur")
     */
    private  $typeIndicateur;

    /**
     * @var Unite $unite
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Unite", inversedBy="unite")
     * @Expose()
     * @ORM\JoinColumn(nullable=false)
     * @SerializedName("unite")
     */
    private $unite;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set libelleIndicateur
     *
     * @param string $libelleIndicateur
     * @return Indicateur
     */
    public function setLibelleIndicateur($libelleIndicateur)
    {

        $this->libelleIndicateur = $libelleIndicateur;

        return $this;
    }

    /**
     * Get libelleIndicateur
     *
     * @return string 
     */
    public function getLibelleIndicateur()
    {
        return $this->libelleIndicateur;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->detailIndicateurs = new ArrayCollection();
    }

    /**
     * Add detailIndicateurs
     *
     * @param \AppBundle\Entity\DetailIndicateur $detailIndicateurs
     * @return Indicateur
     */
    public function addDetailIndicateur(\AppBundle\Entity\DetailIndicateur $detailIndicateurs)
    {
        $this->detailIndicateurs[] = $detailIndicateurs;

        return $this;
    }

    /**
     * Remove detailIndicateurs
     *
     * @param \AppBundle\Entity\DetailIndicateur $detailIndicateurs
     */
    public function removeDetailIndicateur(\AppBundle\Entity\DetailIndicateur $detailIndicateurs)
    {
        $this->detailIndicateurs->removeElement($detailIndicateurs);
    }

    /**
     * Get detailIndicateurs
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getDetailIndicateurs()
    {
        return $this->detailIndicateurs;
    }

    /**
     * Set typeIndicateur
     *
     * @param \AppBundle\Entity\TypeIndicateur $typeIndicateur
     * @return Indicateur
     */
    public function setTypeIndicateur(\AppBundle\Entity\TypeIndicateur $typeIndicateur = null)
    {
        $this->typeIndicateur = $typeIndicateur;

        return $this;
    }

    /**
     * Get typeIndicateur
     *
     * @return \AppBundle\Entity\TypeIndicateur 
     */
    public function getTypeIndicateur()
    {
        return $this->typeIndicateur;
    }

    /**
     * @param Indicateur $newIndicateur
     */
     /*
    public function update(Indicateur $newIndicateur){
        $this->setLibelleIndicateur($newIndicateur->getLibelleIndicateur());
        if($newIndicateur->getTypeIndicateur() !== $this->getTypeIndicateur()){
            $this->setTypeIndicateur($newIndicateur->getTypeIndicateur());
        }
        if($newIndicateur->getUnite() !== $this->getUnite()){
            $this->setUnite($newIndicateur->getUnite());
        }
        foreach($this->getHotes() as $hote){
            $this->removeHote($hote);
        }
        foreach($newIndicateur->getHotes() as $hote){
            $this->addHote($hote);
        }
    }
*/

    /**
     * Set unite
     *
     * @param \AppBundle\Entity\Unite $unite
     * @return Indicateur
     */
    public function setUnite(\AppBundle\Entity\Unite $unite)
    {
        $this->unite = $unite;

        return $this;
    }

    /**
     * Get unite
     *
     * @return \AppBundle\Entity\Unite 
     */
    public function getUnite()
    {
        return $this->unite;
    }
}
