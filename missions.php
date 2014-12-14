<?php
new MISSIONS;
$return = '
<div class="missions">
    <h2>Preview</h2>
    <div class="preview">
        '.MISSIONS::show_preview().'
    </div>
    <h2>Notation</h2>
    <div class="form">
        '.MISSIONS::show_form().'
    </div>
</div>';
return $return;

class MISSIONS{
    static
        $missions_db_file = './_sqlite/KSP-Mission-Overview-Generator.sqlite3'
        ,$missions_table = 'missions'
        ,$missions_dir = '_missions'
        ,$message
        ,$first_run = true
        ,$dbcnnx
    ;
    
    function __construct(){
        if( static::$first_run ){ static::$first_run = false;
            
        }
        
    }
    
    static public function show_preview(){
        $return = '<p>This is the show_preview() function.</p>';
        return $return;
    }
    
    static public function show_form(){
        $return = '<p>This is the show_form() function.</p>';
        return $return;
    }
    
    static private function log_mission(){
        $logged = null;
        
        return $logged;
    }
    
/* END OF CLASS */
}
?>