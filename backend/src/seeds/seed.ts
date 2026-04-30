import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { Industry } from '../models/Industry';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '..', '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is required');
}

const industries = [
  {
    name: 'Thời Trang',
    slug: 'thoi-trang',
    description: 'Các mẫu landing page cho sản phẩm thời trang, phụ kiện và thương hiệu cá nhân.',
    status: 'active'
  },
  {
    name: 'Mỹ Phẩm',
    slug: 'my-pham',
    description: 'Landing page cho mỹ phẩm, skincare, make-up và chiến dịch ra mắt sản phẩm mới.',
    status: 'active'
  },
  {
    name: 'Điện Tử',
    slug: 'dien-tu',
    description: 'Landing page cho thiết bị điện tử, công nghệ tiêu dùng và sản phẩm gia dụng thông minh.',
    status: 'active'
  },
  {
    name: 'Nội Thất',
    slug: 'noi-that',
    description: 'Mẫu landing page cho nội thất gia đình, văn phòng và trang trí không gian sống.',
    status: 'active'
  },
  {
    name: 'Mẹ & Bé',
    slug: 'me-va-be',
    description: 'Landing page cho sản phẩm mẹ và bé, chăm sóc trẻ nhỏ và dinh dưỡng gia đình.',
    status: 'active'
  },
  {
    name: 'Nhà sách & Văn phòng phẩm',
    slug: 'nha-sach-van-phong-pham',
    description: 'Landing page cho nhà sách, văn phòng phẩm, đồ dùng học tập và quà tặng sáng tạo.',
    status: 'active'
  },
  {
    name: 'Ẩm Thực & Ăn Uống',
    slug: 'am-thuc-an-uong',
    description: 'Mẫu landing page cho nhà hàng, đồ uống, thương hiệu F&B và chương trình khuyến mãi.',
    status: 'active'
  },
  {
    name: 'Sức khỏe & Nhà thuốc',
    slug: 'suc-khoe-nha-thuoc',
    description: 'Landing page cho sản phẩm chăm sóc sức khỏe, dược phẩm và dịch vụ tư vấn y tế.',
    status: 'active'
  },
  {
    name: 'Trang sức & Quà tặng',
    slug: 'trang-suc-qua-tang',
    description: 'Landing page cho trang sức cao cấp, quà tặng cá nhân hóa và bộ sưu tập theo mùa.',
    status: 'active'
  },
  {
    name: 'Siêu thị & Tạp hóa',
    slug: 'sieu-thi-tap-hoa',
    description: 'Mẫu landing page cho siêu thị, cửa hàng tiện lợi và danh mục hàng tiêu dùng nhanh.',
    status: 'active'
  }
] as const;

const run = async (): Promise<void> => {
  await mongoose.connect(MONGODB_URI);

  for (const industry of industries) {
    await Industry.findOneAndUpdate(
      { slug: industry.slug },
      { $set: industry },
      { upsert: true, new: true }
    );
  }

  console.log('Seed completed: 10 industries (upsert by slug, users untouched)');
  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
