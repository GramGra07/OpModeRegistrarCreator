function toRun() {
    document.addEventListener("DOMContentLoaded", function () {
        // Select all sections with the class 'active'
        const sections = document.querySelectorAll(".active");

        // Function to toggle the 'active' class
        function toggleActiveSections() {
            sections.forEach((section) => {
                section.classList.toggle("active");
            });
        }
    });
}
function getRegister(servoList) {
    let generatedData = '';
    servoList.forEach((servo) => {
        generatedData += `manager.register(metaForClass(${servo}.class), new ${servo}());\n`;
    });
    return generatedData;
}
function generateData() {
    const selector = document.getElementById('selector').value;
    const servoElement = document.getElementById('servoList').value;
    const servoList = servoElement.split(',').map((item) => item.trim());
    
    let generatedData = ''; // Initialize generatedData as an empty string
    const selector2 = document.getElementById('selector2').value;
    let type = '';
    if (selector2 === 'teleop') {
        type +='TeleOp'
    } else if (selector2 === 'autonomous') {
        type +='Autonomous'
    } else{
        ''
    }
        

    if (selector === 'Java') {
        generatedData = `
        import com.qualcomm.robotcore.eventloop.opmode.OpMode;
        import com.qualcomm.robotcore.eventloop.opmode.OpModeManager;
        import com.qualcomm.robotcore.eventloop.opmode.OpModeRegistrar;
        
        import org.firstinspires.ftc.robotcore.internal.opmode.OpModeMeta;
        
        public final class ${type}Registrar {
            private ${type}Registrar() {
            }
        
            private static OpModeMeta metaForClass(Class<? extends OpMode> cls) {
                return new OpModeMeta.Builder()
                        .setName(cls.getSimpleName())
                        .setGroup("${type}")
                        .setFlavor(OpModeMeta.Flavor.${type.toUpperCase()})
                        .build();
            }
        
            @OpModeRegistrar
            public static void register(OpModeManager manager) {
                        ${getRegister(servoList)}
            }
        }
                `;
    } else if (selector2 === 'Kotlin') {
        generatedData = `
        Kotlin is currently unsupported.
        `;
    }
    
    
    console.log('Generated Data:', generatedData);
    
    // Display the generated data
    document.getElementById('outputText').innerText = generatedData;
}