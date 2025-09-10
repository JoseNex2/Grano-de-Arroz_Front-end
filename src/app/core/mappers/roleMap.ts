const roleMap: { [key: string]: string } = {
    Admin: 'Administrador',
    UserLab: 'Laboratorio',
    UserSales: 'Sucursal'
};

// Función que convierte roles del backend a formato compatible con PrimeNG
export function mapRolesForDropdown(
    roles: { id: number; value: string }[]
): { label: string; value: number }[] {
    return roles.map(role => ({
        label: roleMap[role.value] || role.value, // texto amigable
        value: role.id // valor que se envía al backend
    }));
}