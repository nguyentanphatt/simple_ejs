import connectDB from '../config/database.js';
import models from '../models/index.js';
import mongoose from 'mongoose';
const { project_template_category, project_template_store, bio_project } = models;

// Sample categories data
const sampleCategories = [
  { name: 'Web Development' },
  { name: 'Mobile Development' },
  { name: 'UI/UX Design' },
  { name: 'E-commerce' },
  { name: 'Blog & Content' },
  { name: 'Portfolio' },
  { name: 'Landing Page' },
  { name: 'Dashboard' }
];

// Sample templates data
const sampleTemplates = [
  {
    templateName: 'E-commerce Website Template',
    description: 'A complete e-commerce website template with shopping cart, product catalog, and payment integration',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'
    ],
    data: "67626798d65d4173604a4575",
    createdBy: 'admin@4work.click'
  },
  {
    templateName: 'Portfolio Website Template',
    description: 'Professional portfolio template for showcasing your work and skills',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    ],
    data: "6762689ad65d4173604a457d",
    createdBy: 'admin@4work.click'
  },
  {
    templateName: 'Blog Template',
    description: 'Modern blog template with clean design and excellent readability',
    images: [
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800'
    ],
    data: "67626a99d65d4173604a45ae",
    createdBy: 'admin@4work.click'
  },
  {
    templateName: 'Corporate Business Template',
    description: 'Professional corporate website template for businesses and organizations',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
    ],
    data: "67bd40f7c7a917aaa8603605", // Using the bio project ID from data.json
    createdBy: 'admin@4work.click'
  },
  {
    templateName: 'Restaurant & Food Template',
    description: 'Beautiful restaurant website template with menu showcase and online ordering',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'
    ],
    data: "67625275d65d4173604a4354", // Using the user ID from 4work.Users.json
    createdBy: 'admin@4work.click'
  },
  {
    templateName: 'Creative Agency Template',
    description: 'Modern creative agency template with portfolio showcase and team presentation',
    images: [
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800'
    ],
    data: "65519d6712810a3b6ac266b7", // Using the user ID from data.json
    createdBy: 'admin@4work.click'
  }
];

const sampleBioProjects = [
  {
    "_id": {
      "$oid": "67626798d65d4173604a4575"
    },
    "status": 1,
    "link": [],
    "idUser": {
      "$oid": "67625275d65d4173604a4354"
    },
    "projectName": "3 THÁNG 10 NGÀY 🍼✨",
    "clientName": "Trịnh Gia",
    "agencyName": "Trịnh Gia",
    "time": "3m10d",
    "role": "Carii",
    "projectOverview": "<p>Xin ch&agrave;o cả nh&agrave; y&ecirc;u thương! 🌟 Con nay đ&atilde; tr&ograve;n 3 th&aacute;ng 10 ng&agrave;y rồi n&egrave;! 🍼✨ Con vẫn nhỏ x&iacute;u, nhưng sức h&uacute;t th&igrave; ng&agrave;y c&agrave;ng lớn nha. 😘 Với đ&ocirc;i m&aacute; ph&uacute;ng ph&iacute;nh 🐷, nụ cười như &aacute;nh nắng ☀️, v&agrave; đ&ocirc;i mắt long lanh như sao ✨, con đ&atilde; l&agrave;m cả nh&agrave; bận rộn v&igrave; y&ecirc;u con qu&aacute; nhiều lu&ocirc;n! 💖 Mỗi ng&agrave;y của con đều l&agrave; một h&agrave;nh tr&igrave;nh kh&aacute;m ph&aacute; th&uacute; vị: từ tập &ecirc; a n&oacute;i chuyện 👶, tập cười to thật gi&ograve;n 😂, cho đến l&agrave;m đủ kiểu biểu cảm khiến ai cũng m&ecirc; mẩn. H&atilde;y tiếp tục y&ecirc;u thương con thật nhiều để con lớn l&ecirc;n thật ngoan, thật khỏe mạnh nha! 🤗💫</p>",
    "persionalSOW": "",
    "category": "",
    "files": [
      {
        "_id": {
          "$oid": "67626798d65d4173604a4576"
        },
        "dbfilename": "images/20241218T061135949Z_project.jpg",
        "size": 405506,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T061135949Z_project.jpg",
        "name": "374172932_823877009270530_6737355723081606908_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      }
    ],
    "description": [],
    "collaborators": [],
    "createdAt": {
      "$date": "2024-12-18T06:11:36.460Z"
    },
    "__v": 3,
    "clicks": 89,
    "settings": {
      "relate": {
        "type": 1,
        "manualIds": []
      },
      "accessPersonalLink": {
        "type": 0,
        "url": ""
      },
      "googleAnalytics": {
        "type": 0,
        "id": ""
      },
      "facebookPixel": {
        "type": 0,
        "id": ""
      },
      "analyticsInsight": 1,
      "publicWorkFeed": 1,
      "quickContact": 1,
      "_id": {
        "$oid": "67ee4d5c566cef90489cac36"
      }
    },
    "updatedAt": {
      "$date": "2025-04-03T08:57:00.590Z"
    },
    "isPrivate": 0,
    "categories": [
      {
        "$oid": "67dfbf2df6f2a8a592deb99f"
      }
    ],
    "modifined": 0,
    "op_description": "Xin chào cả nhà yêu thương! 🌟 Con nay đã tròn 3 tháng 10 ngày rồi nè! 🍼✨ Con vẫn nhỏ xíu, nhưng sức hút thì ngày càng lớn nha. 😘 Với đôi má phúng phính 🐷, nụ cười như ánh nắng ☀️, và đôi mắt long lanh như sao ✨, con đã làm cả nhà bận rộn vì yêu con quá nhiều luôn! 💖 Mỗi ngày của con đều là một",
    "pin": 0
  },
  {
    "_id": {
      "$oid": "6762689ad65d4173604a457d"
    },
    "status": 1,
    "link": [
      "https://xemaygiare.com"
    ],
    "idUser": {
      "$oid": "67625275d65d4173604a4354"
    },
    "projectName": "3 THÁNG 18 NGÀY 🌸",
    "clientName": "Trịnh Gia",
    "agencyName": "Trịnh Gia",
    "time": "3m18d",
    "role": "Carii",
    "projectOverview": "<p>Ch&agrave;o cả nh&agrave;! 🥰 H&ocirc;m nay em b&eacute; đ&atilde; được 3 th&aacute;ng 18 ng&agrave;y rồi n&egrave;! 🎉 Em lớn nhanh qu&aacute; phải kh&ocirc;ng? Mỗi ng&agrave;y em lại học được nhiều điều mới, cười thật tươi 😊 v&agrave; th&iacute;ch ngắm mọi người xung quanh 🥰. Em cảm ơn ba mẹ v&agrave; tất cả mọi người đ&atilde; y&ecirc;u thương v&agrave; chăm s&oacute;c em suốt thời gian qua 💖. Ch&uacute;c cả nh&agrave; lu&ocirc;n vui vẻ v&agrave; hạnh ph&uacute;c như em nh&eacute;! 🌸</p>",
    "persionalSOW": "",
    "category": "",
    "files": [
      {
        "_id": {
          "$oid": "6762689ad65d4173604a457e"
        },
        "dbfilename": "images/20241218T061553437Z_project.jpg",
        "size": 459849,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T061553437Z_project.jpg",
        "name": "376780817_321960487035125_6639780373861252725_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      },
      {
        "_id": {
          "$oid": "6762689ad65d4173604a457f"
        },
        "dbfilename": "images/20241218T061553974Z_project.jpg",
        "size": 428951,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T061553974Z_project.jpg",
        "name": "376791144_995345478347576_4568295723803485347_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      },
      {
        "_id": {
          "$oid": "6762689ad65d4173604a4580"
        },
        "dbfilename": "images/20241218T061554446Z_project.jpg",
        "size": 62644,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T061554446Z_project.jpg",
        "name": "377396511_267577512896669_5750689281404437903_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      }
    ],
    "description": [],
    "collaborators": [],
    "createdAt": {
      "$date": "2024-12-18T06:15:54.571Z"
    },
    "__v": 2,
    "clicks": 98,
    "settings": {
      "relate": {
        "type": 1,
        "manualIds": []
      },
      "accessPersonalLink": {
        "type": 0,
        "url": ""
      },
      "googleAnalytics": {
        "type": 0,
        "id": ""
      },
      "facebookPixel": {
        "type": 0,
        "id": ""
      },
      "analyticsInsight": 1,
      "publicWorkFeed": 1,
      "quickContact": 1,
      "_id": {
        "$oid": "67ee4d59566cef90489cac1a"
      }
    },
    "updatedAt": {
      "$date": "2025-04-03T08:56:57.439Z"
    },
    "modifined": 0,
    "isPrivate": 0,
    "categories": [
      {
        "$oid": "67dfbf2df6f2a8a592deb99f"
      }
    ],
    "op_description": "Chào cả nhà! 🥰 Hôm nay em bé đã được 3 tháng 18 ngày rồi nè! 🎉 Em lớn nhanh quá phải không? Mỗi ngày em lại học được nhiều điều mới, cười thật tươi 😊 và thích ngắm mọi người xung quanh 🥰. Em cảm ơn ba mẹ và tất cả mọi người đã yêu thương và chăm sóc em suốt thời gian qua 💖. Chúc cả nhà luôn vui",
    "pin": 0
  },
  {
    "_id": {
      "$oid": "67626a99d65d4173604a45ae"
    },
    "status": 1,
    "link": [],
    "idUser": {
      "$oid": "67625275d65d4173604a4354"
    },
    "projectName": "Hôm nay Ri đi chích ngừa rồi nè",
    "clientName": "Trịnh Gia",
    "agencyName": "Trịnh Gia",
    "time": "💉💪",
    "role": "Carii",
    "projectOverview": "<p>H&ocirc;m nay Ri đi ch&iacute;ch ngừa rồi n&egrave;, m&agrave; vui lắm lu&ocirc;n! Mấy c&acirc;y kim nhỏ x&iacute;u n&agrave;y với Ri th&igrave; chẳng l&agrave; g&igrave; cả đ&acirc;u nha! 😄 Ri dũng cảm lắm, chẳng sợ một ch&uacute;t n&agrave;o đ&acirc;u, như si&ecirc;u anh h&ugrave;ng vậy đ&oacute;! 💪🤣 Ch&iacute;ch xong Ri vẫn cười tươi như thường, mấy b&aacute;c sĩ chắc phải ngạc nhi&ecirc;n với sự gan dạ của Ri đấy! 😆✨</p>",
    "persionalSOW": "",
    "category": "",
    "files": [
      {
        "_id": {
          "$oid": "67626a99d65d4173604a45af"
        },
        "dbfilename": "images/20241218T062424035Z_project.jpg",
        "size": 256743,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T062424035Z_project.jpg",
        "name": "403864020_717471566634959_2339680694467743175_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      },
      {
        "_id": {
          "$oid": "67626a99d65d4173604a45b0"
        },
        "dbfilename": "images/20241218T062424434Z_project.jpg",
        "size": 51599,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T062424434Z_project.jpg",
        "name": "403878086_896431085251965_6794292103569014303_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      },
      {
        "_id": {
          "$oid": "67626a99d65d4173604a45b1"
        },
        "dbfilename": "images/20241218T062424583Z_project.jpg",
        "size": 65074,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T062424583Z_project.jpg",
        "name": "403888653_861883472055141_2497699503905623549_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      },
      {
        "_id": {
          "$oid": "67626a99d65d4173604a45b2"
        },
        "dbfilename": "images/20241218T062424726Z_project.jpg",
        "size": 50653,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T062424726Z_project.jpg",
        "name": "403939470_668792738717549_6619135108906480963_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      },
      {
        "_id": {
          "$oid": "67626a99d65d4173604a45b3"
        },
        "dbfilename": "images/20241218T062424878Z_project.jpg",
        "size": 66701,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T062424878Z_project.jpg",
        "name": "404660818_1445893006326432_3322161020724356772_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      }
    ],
    "description": [],
    "collaborators": [],
    "createdAt": {
      "$date": "2024-12-18T06:24:25.262Z"
    },
    "__v": 3,
    "clicks": 98,
    "settings": {
      "relate": {
        "type": 1,
        "manualIds": []
      },
      "accessPersonalLink": {
        "type": 1,
        "url": "hom-nay-ri-di-chich-ngua-roi-ne"
      },
      "googleAnalytics": {
        "type": 0,
        "id": ""
      },
      "facebookPixel": {
        "type": 0,
        "id": ""
      },
      "analyticsInsight": 1,
      "publicWorkFeed": 1,
      "quickContact": 1,
      "_id": {
        "$oid": "67ee4d55566cef90489cabfa"
      }
    },
    "updatedAt": {
      "$date": "2025-04-03T08:56:53.249Z"
    },
    "modifined": 0,
    "isPrivate": 0,
    "categories": [
      {
        "$oid": "67dfbf2df6f2a8a592deb99f"
      }
    ],
    "op_description": "Hôm nay Ri đi chích ngừa rồi nè, mà vui lắm luôn! Mấy cây kim nhỏ xíu này với Ri thì chẳng là gì cả đâu nha! 😄 Ri dũng cảm lắm, chẳng sợ một chút nào đâu, như siêu anh hùng vậy đó! 💪🤣 Chích xong Ri vẫn cười tươi như thường, mấy bác sĩ chắc phải ngạc nhiên với sự gan dạ của Ri đấy! 😆✨",
    "pin": 0
  },
  {
    "_id": {
      "$oid": "67626b6fd65d4173604a45c3"
    },
    "status": 1,
    "link": [],
    "idUser": {
      "$oid": "67625275d65d4173604a4354"
    },
    "projectName": "7 THÁNG 20 NGÀY  🎶",
    "clientName": "Trịnh Gia",
    "agencyName": "Trịnh Gia",
    "time": "7m20d",
    "role": "Carii",
    "projectOverview": "<p>Ch&agrave;o cả nh&agrave; y&ecirc;u thương! 😄 H&ocirc;m nay em b&eacute; đ&atilde; được 7 th&aacute;ng 20 ng&agrave;y rồi n&egrave;! 🎉 Em đ&atilde; lớn thật nhanh, mỗi ng&agrave;y đều học được bao nhi&ecirc;u điều th&uacute; vị! Em bắt đầu biết ngồi vững, tập đứng l&ecirc;n bằng đ&ocirc;i ch&acirc;n nhỏ xinh, v&agrave; c&ograve;n th&iacute;ch kh&aacute;m ph&aacute; mọi thứ xung quanh nữa. Em đ&atilde; biết cười thật to khi mọi người chơi đ&ugrave;a với em, v&agrave; th&iacute;ch nghe ba mẹ h&aacute;t những b&agrave;i h&aacute;t vui nhộn. 🎶 Cảm ơn cả nh&agrave; đ&atilde; lu&ocirc;n b&ecirc;n em, chăm s&oacute;c em từng ch&uacute;t một. Em y&ecirc;u cả nh&agrave; nhiều lắm! 💖 H&atilde;y lu&ocirc;n vui vẻ như em nh&eacute;! 😘</p>",
    "persionalSOW": "",
    "category": "",
    "files": [
      {
        "_id": {
          "$oid": "67626b6fd65d4173604a45c4"
        },
        "dbfilename": "images/20241218T062759211Z_project.jpg",
        "size": 75480,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T062759211Z_project.jpg",
        "name": "418386751_728301972600025_5658855581178234743_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      },
      {
        "_id": {
          "$oid": "67626b6fd65d4173604a45c5"
        },
        "dbfilename": "images/20241218T062759450Z_project.jpg",
        "size": 72049,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T062759450Z_project.jpg",
        "name": "418757707_291116910606705_6573500583567205070_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      },
      {
        "_id": {
          "$oid": "67626b6fd65d4173604a45c6"
        },
        "dbfilename": "images/20241218T062759631Z_project.jpg",
        "size": 76854,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T062759631Z_project.jpg",
        "name": "419261543_908327190937891_1962560092126732371_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      },
      {
        "_id": {
          "$oid": "67626b6fd65d4173604a45c7"
        },
        "dbfilename": "images/20241218T062759791Z_project.jpg",
        "size": 73198,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T062759791Z_project.jpg",
        "name": "419279994_1079783233360837_3348991667339274624_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      }
    ],
    "description": [],
    "collaborators": [],
    "createdAt": {
      "$date": "2024-12-18T06:27:59.924Z"
    },
    "__v": 3,
    "clicks": 99,
    "settings": {
      "relate": {
        "type": 1,
        "manualIds": []
      },
      "accessPersonalLink": {
        "type": 1,
        "url": "7-tháng-20-ngày-🎶"
      },
      "googleAnalytics": {
        "type": 0,
        "id": ""
      },
      "facebookPixel": {
        "type": 0,
        "id": ""
      },
      "analyticsInsight": 1,
      "publicWorkFeed": 1,
      "quickContact": 1,
      "_id": {
        "$oid": "67ee4d52566cef90489cabdd"
      }
    },
    "updatedAt": {
      "$date": "2025-04-03T08:56:50.380Z"
    },
    "modifined": 0,
    "isPrivate": 0,
    "categories": [
      {
        "$oid": "67dfbf2df6f2a8a592deb99f"
      }
    ],
    "op_description": "Chào cả nhà yêu thương! 😄 Hôm nay em bé đã được 7 tháng 20 ngày rồi nè! 🎉 Em đã lớn thật nhanh, mỗi ngày đều học được bao nhiêu điều thú vị! Em bắt đầu biết ngồi vững, tập đứng lên bằng đôi chân nhỏ xinh, và còn thích khám phá mọi thứ xung quanh nữa. Em đã biết cười thật to khi mọi người chơi đùa",
    "pin": 0
  },
  {
    "_id": {
      "$oid": "67626c3fd65d4173604a45cb"
    },
    "status": 1,
    "link": [],
    "idUser": {
      "$oid": "67625275d65d4173604a4354"
    },
    "projectName": "MÙA XUÂN ĐẦU TIÊN 🌸✨",
    "clientName": "Trịnh Gia",
    "agencyName": "Trịnh Gia",
    "time": "HPNY",
    "role": "Carii",
    "projectOverview": "<p>Ch&agrave;o cả nh&agrave;! Tết đến rồi, em b&eacute; c&ugrave;ng ba mẹ đi ch&uacute;c xu&acirc;n cả nh&agrave; n&egrave;! 🐣🎉 Mọi người ai cũng mặc &aacute;o mới, nh&igrave;n thật đẹp v&agrave; vui vẻ, em thấy cũng thật th&iacute;ch th&uacute; lắm! Em ch&uacute;c mọi người năm mới thật nhiều sức khỏe, hạnh ph&uacute;c v&agrave; may mắn như những b&ocirc;ng hoa nở rộ trong m&ugrave;a xu&acirc;n. 🌸✨ Em được mọi người &ocirc;m ch&uacute;c Tết, ai cũng khen em lớn nhanh, dễ thương lắm! Em cảm ơn ba mẹ đ&atilde; đưa em đi ch&uacute;c xu&acirc;n, năm nay em đ&atilde; biết cười v&agrave; vui vẻ c&ugrave;ng mọi người rồi, mong cả nh&agrave; năm mới lu&ocirc;n vui vẻ, an l&agrave;nh nha! 💖😊</p>",
    "persionalSOW": "",
    "category": "",
    "files": [
      {
        "_id": {
          "$oid": "67626c3fd65d4173604a45cc"
        },
        "dbfilename": "images/20241218T063127176Z_project.jpg",
        "size": 41652,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T063127176Z_project.jpg",
        "name": "425625322_765664168813865_5211464595186429170_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      },
      {
        "_id": {
          "$oid": "67626c3fd65d4173604a45cd"
        },
        "dbfilename": "images/20241218T063127371Z_project.jpg",
        "size": 43841,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T063127371Z_project.jpg",
        "name": "426020700_917604756589131_6741125269542738178_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      },
      {
        "_id": {
          "$oid": "67626c3fd65d4173604a45ce"
        },
        "dbfilename": "images/20241218T063127511Z_project.jpg",
        "size": 43105,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T063127511Z_project.jpg",
        "name": "426848511_437569271934402_7869377610481350266_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      },
      {
        "_id": {
          "$oid": "67626c3fd65d4173604a45cf"
        },
        "dbfilename": "images/20241218T063127649Z_project.jpg",
        "size": 47513,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T063127649Z_project.jpg",
        "name": "427225523_369010725914836_7579753817516539613_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      }
    ],
    "description": [],
    "collaborators": [],
    "createdAt": {
      "$date": "2024-12-18T06:31:27.783Z"
    },
    "__v": 3,
    "clicks": 78,
    "settings": {
      "relate": {
        "type": 1,
        "manualIds": []
      },
      "accessPersonalLink": {
        "type": 0,
        "url": ""
      },
      "googleAnalytics": {
        "type": 0,
        "id": ""
      },
      "facebookPixel": {
        "type": 0,
        "id": ""
      },
      "analyticsInsight": 1,
      "publicWorkFeed": 1,
      "quickContact": 1,
      "_id": {
        "$oid": "67ee4eef8c4f719154003567"
      }
    },
    "pin": 1,
    "updatedAt": {
      "$date": "2025-04-03T09:03:43.179Z"
    },
    "isPrivate": 0,
    "categories": [
      {
        "$oid": "67dfbf2df6f2a8a592deb99f"
      }
    ],
    "modifined": 0,
    "op_description": "Chào cả nhà! Tết đến rồi, em bé cùng ba mẹ đi chúc xuân cả nhà nè! 🐣🎉 Mọi người ai cũng mặc áo mới, nhìn thật đẹp và vui vẻ, em thấy cũng thật thích thú lắm! Em chúc mọi người năm mới thật nhiều sức khỏe, hạnh phúc và may mắn như những bông hoa nở rộ trong mùa xuân. 🌸✨ Em được mọi người ôm chúc T"
  },
  {
    "_id": {
      "$oid": "67628df9eaf42a52aab792e6"
    },
    "status": 1,
    "link": [
      "https://xemaygiare.com"
    ],
    "idUser": {
      "$oid": "67625275d65d4173604a4354"
    },
    "projectName": "Năm Đầu Tiên Em Được Thả Diều 🪁✨ – Bay Cao Như Giấc Mơ Nhỏ!",
    "clientName": "Trịnh Gia",
    "agencyName": "Trịnh Gia",
    "time": "2024",
    "role": "Carii",
    "projectOverview": "<p>H&ocirc;m nay được bữa b&agrave; m&aacute; với d&igrave; &Uacute;t dẫn em đi coi thả diều n&egrave;! 🪁 Trời ơi, c&aacute;i g&igrave; m&agrave; bay cao qu&aacute; trời cao, l&agrave;m em ng&oacute; muốn mỏi cả cổ lu&ocirc;n! 😵&zwj;💫 C&oacute; con diều to như c&aacute;i nh&agrave;, m&agrave; cũng c&oacute; con nhỏ x&iacute;u y chang c&aacute;i l&aacute; c&acirc;y. Em thấy ai cũng chạy tới chạy lui k&eacute;o d&acirc;y, c&ograve;n em th&igrave; ngồi một chỗ... vỗ tay cổ vũ th&ocirc;i nha! 👏😄 M&agrave; vui nhất l&agrave; l&uacute;c d&igrave; &Uacute;t bảo thả cho em một con diều nhỏ, ai ngờ gi&oacute; thổi bay đi mất ti&ecirc;u! 😅 B&agrave; m&aacute; cười muốn xỉu, c&ograve;n em th&igrave; nh&igrave;n theo tiếc ơi l&agrave; tiếc, nhưng vẫn vui v&igrave; được chơi một ng&agrave;y thật đ&atilde; nha! 🤩✨</p>",
    "persionalSOW": "",
    "category": "Discovery Now",
    "files": [
      {
        "_id": {
          "$oid": "67628df9eaf42a52aab792e7"
        },
        "dbfilename": "images/20241218T085520169Z_project.jpg",
        "size": 73814,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T085520169Z_project.jpg",
        "name": "428424062_888461286296973_2014472357364610004_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      },
      {
        "_id": {
          "$oid": "67628df9eaf42a52aab792e8"
        },
        "dbfilename": "images/20241218T085520474Z_project.jpg",
        "size": 71662,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T085520474Z_project.jpg",
        "name": "428596933_271932449285389_6403026542989985583_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      },
      {
        "_id": {
          "$oid": "67628df9eaf42a52aab792e9"
        },
        "dbfilename": "images/20241218T085520680Z_project.jpg",
        "size": 70583,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T085520680Z_project.jpg",
        "name": "429155675_1358249928198977_7241573327274175118_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      },
      {
        "_id": {
          "$oid": "67628df9eaf42a52aab792ea"
        },
        "dbfilename": "images/20241218T085520907Z_project.jpg",
        "size": 78878,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T085520907Z_project.jpg",
        "name": "429282440_1197860354932233_3356974869109956310_n.jpg",
        "bucketName": "67625275d65d4173604a4354",
        "type": "image"
      },
      {
        "_id": {
          "$oid": "67628ea1eaf42a52aab792fc"
        },
        "dbfilename": "images/20241218T085807623Z_project.jpg",
        "size": 370970,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T085807623Z_project.jpg",
        "name": "429344210_1126609312109799_8118891638490056389_n.jpg",
        "bucketName": "67625275d65d4173604a4354"
      },
      {
        "_id": {
          "$oid": "67628ea1eaf42a52aab792fd"
        },
        "dbfilename": "images/20241218T085808365Z_project.jpg",
        "size": 327432,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T085808365Z_project.jpg",
        "name": "429556336_3602789733366630_1961595991485249942_n.jpg",
        "bucketName": "67625275d65d4173604a4354"
      },
      {
        "_id": {
          "$oid": "67628ea1eaf42a52aab792fe"
        },
        "dbfilename": "images/20241218T085808923Z_project.jpg",
        "size": 81825,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T085808923Z_project.jpg",
        "name": "429638540_1038044183928275_1239995323119493006_n.jpg",
        "bucketName": "67625275d65d4173604a4354"
      },
      {
        "_id": {
          "$oid": "67628ea1eaf42a52aab792ff"
        },
        "dbfilename": "images/20241218T085809079Z_project.jpg",
        "size": 74720,
        "url": "https://cdn.4wk.vn/67625275d65d4173604a4354/images/20241218T085809079Z_project.jpg",
        "name": "429757618_7377905552230801_6489715621144924311_n.jpg",
        "bucketName": "67625275d65d4173604a4354"
      }
    ],
    "description": [],
    "collaborators": [],
    "createdAt": {
      "$date": "2024-12-18T08:55:21.129Z"
    },
    "__v": 3,
    "clicks": 100,
    "settings": {
      "relate": {
        "type": 1,
        "manualIds": []
      },
      "accessPersonalLink": {
        "type": 0,
        "url": ""
      },
      "googleAnalytics": {
        "type": 0,
        "id": ""
      },
      "facebookPixel": {
        "type": 0,
        "id": ""
      },
      "analyticsInsight": 1,
      "publicWorkFeed": 1,
      "quickContact": 1,
      "_id": {
        "$oid": "67ee4eec8c4f71915400354b"
      }
    },
    "pin": 1,
    "updatedAt": {
      "$date": "2025-04-03T09:03:40.476Z"
    },
    "modifined": 0,
    "isPrivate": 0,
    "categories": [
      {
        "$oid": "67dfbf2df6f2a8a592deb99f"
      }
    ],
    "op_description": "Hôm nay được bữa bà má với dì Út dẫn em đi coi thả diều nè! 🪁 Trời ơi, cái gì mà bay cao quá trời cao, làm em ngó muốn mỏi cả cổ luôn! 😵‍💫 Có con diều to như cái nhà, mà cũng có con nhỏ xíu y chang cái lá cây. Em thấy ai cũng chạy tới chạy lui kéo dây, còn em thì ngồi một chỗ... vỗ tay cổ vũ thôi"
  }
]

async function initializeDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await connectDB();
    
    console.log('🗑️ Clearing existing data...');
    await project_template_store.deleteMany({});
    await project_template_category.deleteMany({});
    await bio_project.deleteMany({});
    console.log('📝 Creating categories...');
    const createdCategories = await project_template_category.insertMany(sampleCategories);
    console.log(`✅ Created ${createdCategories.length} categories`);
    
    console.log('📦 Creating templates...');
    const templatesWithCategories = sampleTemplates.map((template, index) => ({
      ...template,
      category: createdCategories[index % createdCategories.length]._id
    }));
    
    const createdTemplates = await project_template_store.insertMany(templatesWithCategories);
    console.log(`✅ Created ${createdTemplates.length} templates`);
    
    const createdBioProjects = await bio_project.insertMany(sampleBioProjects);
    console.log(`✅ Created ${createdBioProjects.length} bio projects`);

    console.log('📊 Database Summary:');
    const categoryCount = await project_template_category.countDocuments();
    const templateCount = await project_template_store.countDocuments();
    console.log(`   - Categories: ${categoryCount}`);
    console.log(`   - Templates: ${templateCount}`);
    
    console.log('🎉 Database initialization completed successfully!');
    
    // Display sample data
    console.log('\n📋 Sample Categories:');
    const categories = await project_template_category.find();
    categories.forEach(cat => {
      console.log(`   - ${cat.name} (ID: ${cat.id})`);
    });
    
    console.log('\n📋 Sample Templates:');
    const templates = await project_template_store.find().populate('category', 'name');
    templates.forEach(template => {
      console.log(`   - ${template.templateName} (Category: ${template.category.name})`);
    });
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the initialization
initializeDatabase(); 