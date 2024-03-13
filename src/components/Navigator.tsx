import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AttachmentIcon from '@mui/icons-material/Attachment';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import BadgeIcon from '@mui/icons-material/Badge';
import ContactsIcon from '@mui/icons-material/Contacts';
import CampaignIcon from '@mui/icons-material/Campaign';
import AssessmentIcon from '@mui/icons-material/Assessment';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import SavingsIcon from '@mui/icons-material/Savings';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PolicyIcon from '@mui/icons-material/Policy';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import RvHookupIcon from '@mui/icons-material/RvHookup';
import GarageIcon from '@mui/icons-material/Garage';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import InventoryIcon from '@mui/icons-material/Inventory';
import QrCodeIcon from '@mui/icons-material/QrCode';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Image } from '@mui/icons-material';
import Link from 'next/link';


const categories = [
    {
        id: 'Administração',
        children: [
            {
                id: 'Clientes',
                icon: <PeopleIcon />,
                link: '/administracao/clientes',
                active: true,
            },
            { id: 'Fornecedores', icon: <AttachmentIcon />, link: '/administracao/fornecedores' },
            { id: 'Funcionários', icon: <BadgeIcon />, link: '/administracao/funcionarios' },
            { id: 'Contatos', icon: <ContactsIcon />, link: '/administracao/contatos' },
            { id: 'Comunicação Interna', icon: <CampaignIcon />, link: '/administracao/comunicacaointerna' },
            { id: 'Relatórios', icon: <AssessmentIcon />, link: '/administracao/relatorios' }
        ],
    },
    {
        id: 'Financeiro',
        children: [
            { id: 'Contas', icon: <RequestQuoteIcon />, link: '/financeiro/contas' },
            { id: 'Fluxo de caixa', icon: <SavingsIcon />, link: '/financeiro/fluxiodecaixa' },

            { id: 'Análise de crédito', icon: <PlagiarismIcon />, link: '/financeiro/analisedecredito' },
            { id: 'Centros de custos', icon: <StorefrontIcon />, link: '/financeiro/centrosdecustos' },
            { id: 'Consulta serasa', icon: <PolicyIcon />, link: '/financeiro/consultaserasa' },
            { id: 'Relatórios', icon: <AssessmentIcon />, link: '/financeiro/relatorios' },
        ],
    },
    {
        id: 'Logística',
        children: [
            { id: 'Cargas', icon: <LocalShippingIcon />, link: '/logistica/cargas' },
            { id: 'Motoristas', icon: <PersonIcon />, link: '/logistica/motoristas' },
            { id: 'Viajem', icon: <RvHookupIcon />, link: '/logistica/viajem' },
            { id: 'Frota', icon: <GarageIcon />, link: '/logistica/frota' },
            { id: 'Relatórios', icon: <AssessmentIcon />, link: '/logistica/relatorios' },

        ],
    },
    {
        id: 'Estoque',
        children: [
            { id: 'Wherehouses', icon: <WarehouseIcon />, link: '/estoque/wherehouses' },
            { id: 'Produtos', icon: <QrCodeIcon />, link: '/estoque/produtos' },
            { id: 'Almoxarifado', icon: <InventoryIcon />, link: '/estoque/almoxarifado' },
            { id: 'Relatórios', icon: <PhonelinkSetupIcon />, link: '/estoque/relatorios' },

        ],
    },
    {
        id: 'Planejamentos e Controle',
        children: [
            { id: 'Produção', icon: <PrecisionManufacturingIcon />, link: '/planejamentoecontrole/producao' },
            { id: 'Saída de produtos', icon: <ArrowOutwardIcon />, link: '/planejamentoecontrole/saidadeprodutos' },
        ],
    },
    {
        id: 'Faturamento',
        children: [
            { id: 'Compras', icon: <ShoppingCartIcon />, link: '/faturamento/compras' },
            { id: 'Vendas', icon: <SellIcon />, link: '/faturamento/vendas' },
            { id: 'Rendimentos', icon: <MonetizationOnIcon />, link: '/faturamento/rendimentos' }
        ],
    },
];

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

export default function Navigator(props: DrawerProps) {
    const { ...other } = props;

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>

                    <Box
                        component="img"
                        sx={{
                            height: 180,
                            width: 180,
                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 350, md: 250 },
                        }}
                        alt="Polvilho Três Coqueiros"
                        src="/logo.jpg"
                    />

                </ListItem>
                <ListItem sx={{ ...item, ...itemCategory }}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>Inicio</ListItemText>
                </ListItem>
                {categories.map(({ id, children }) => (
                    <Box key={id} sx={{ bgcolor: '#122708' }}>
                        <ListItem sx={{ py: 2, px: 3 }}>
                            <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, icon, link, active }) => (
                            <Link style={{ textDecoration: 'none' }} href={link||'/'}>
                                <ListItem disablePadding key={childId}>

                                    <ListItemButton selected={active} sx={item}>
                                        <ListItemIcon>{icon}</ListItemIcon>
                                        <ListItemText>{childId}</ListItemText>
                                    </ListItemButton>

                                </ListItem>
                            </Link>
                        ))}
                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </List>
        </Drawer>
    );
}
