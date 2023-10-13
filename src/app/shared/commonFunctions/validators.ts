import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export function AlreadyExistValidator(orginalList: any[], property: string, excludedId: number = null): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

        for (let item of orginalList) {
            if (item.id != excludedId &&
                ((typeof item[property] != "object" && item[property] === control.value)
                    || (typeof item[property] == "object" && JSON.stringify(item[property]) === JSON.stringify(control.value)))) {
                return { duplicateValue: { valid: false, value: control.value } };
            }
        }
        return null;
    }


}
export function timeStartEnd(fg: FormGroup): { [key: string]: any }|null {
    const start = fg.get('startHour').value;
    const end = fg.get('endHour').value;
 
    return start && end && start < end ? null : { startEnd: {valid:false ,value:'notvalid'} };
 }
