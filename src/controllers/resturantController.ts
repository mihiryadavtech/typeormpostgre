import { Express, NextFunction, Request, response, Response } from 'express';
import { Category } from '../entitiy/Category';
import { AppDataSource } from '../db';
import { Restaurant } from '../entitiy/Restaurant';
import { RestaurantCategory } from '../entitiy/RestaurantCategory';

const getRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    if (id) {
      const getRestaurant = await AppDataSource.getRepository(Restaurant)
        .createQueryBuilder('restaurant')
        .leftJoinAndSelect('restaurant.category', 'restaurantCategory')
        .leftJoinAndSelect('restaurantCategory.relCategory', 'category')
        .leftJoinAndSelect('restaurant.food', 'food')
        .where({ id: id })
        .getRawOne();

      let mainRestaurantWithUrl = getRestaurant;
      const urlSend = getRestaurant.restaurant_image;
      const urlImage = `http://localhost:8000/api/v1/image/${urlSend.filename}`;
      mainRestaurantWithUrl.restaurant_image.imageUrl = urlImage;

      res.status(200).json({ data: mainRestaurantWithUrl });
    } else if (id?.length == 0) {
      res.status(400).json({
        message: 'Enter proper query',
      });
    } else {
      const getRestaurant = await AppDataSource.getRepository(Restaurant)
        .createQueryBuilder('restaurant')
        .leftJoinAndSelect('restaurant.category', 'restaurantCategory')
        .leftJoinAndSelect('restaurantCategory.relCategory', 'category')
        .getMany();
      let mainRestaurantWithUrl = getRestaurant;
      const urlSend = getRestaurant;
      for (let index = 0; index < urlSend.length; index++) {
        const element = urlSend[index];
        const imageObj = element.image;
        const urlImage = `http://localhost:8000/api/v1/image/${imageObj.filename}`;
        console.log((mainRestaurantWithUrl[index].image.imageurl = urlImage));
      }
      res.status(200).json({ data: mainRestaurantWithUrl });
    }
  } catch (error) {
    const errors = {
      code: 400,
      error: {
        message: error.message,
      },
      message: ' Somekind Of Error',
    };
    res.status(400).json({ errors });
  }
};

const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, address } = req.body;
    const image = req.file;
    if (typeof name === 'string' && typeof address === 'string') {
      const restaurantExist = await AppDataSource.getRepository(
        Restaurant
      ).findOneBy({ name: name });
      if (!restaurantExist) {
        const newRestaurant = await AppDataSource.createQueryBuilder()
          .insert()
          .into(Restaurant)
          .values({
            name: name,
            address: address,
            image: image,
          })
          .returning('*')
          .execute();

        res.status(200).json({ data: newRestaurant.raw[0] });
      } else {
        res.status(200).json({ data: 'Restaurant already exist' });
      }
    } else {
      res
        .status(404)
        .json({ message: 'Name must be string and Address must be string' });
    }
  } catch (error) {
    res.status(404).json({ errror: error.message });
  }
};

const updateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.query;
  const { name, address } = req.body;
  const image = req.file?.fieldname;
  try {
    if (typeof name === 'string' && typeof address === 'string') {
      const newupdatedRestaurant = await AppDataSource.createQueryBuilder()
        .update(Restaurant)
        .set({ name: name, address: address, image: image })
        .where({ id: id })
        .returning('*')
        .execute();
      res.status(201).json({ data: newupdatedRestaurant.raw[0] });
    } else {
      res
        .status(404)
        .json({ message: 'Name must be string and Address must be string' });
    }
  } catch (error) {
    res.status(201).json({ errror: error.message });
    // console.log(error);
  }
};

const deleteRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    const deleteRestaurant = await AppDataSource.createQueryBuilder()
      .delete()
      .from(Restaurant)
      .where({ id: id })
      .returning('*')
      .execute();

    res.status(201).json({ data: deleteRestaurant.raw[0] });
  } catch (error) {
    console.log(error);
  }
};
const createRestRelation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId, restId } = req.query;
    const restaurantExist = await AppDataSource.getRepository(Restaurant)
      .createQueryBuilder('restaurant')
      .where('restaurant.id=:id', { id: restId })
      .execute();
    // console.log('======>>>>>>', restaurantExist);

    const categoryExist = await AppDataSource.getRepository(Category)
      .createQueryBuilder('category')
      .where('category.id=:id', { id: categoryId })
      .execute();
    // console.log('======>>>>>>', categoryExist);

    if (restaurantExist && categoryExist) {
      const alReadyRelationExist = await AppDataSource.getRepository(
        RestaurantCategory
      )
        .createQueryBuilder('restaurantCategory')
        .where('restaurantCategory.relRestaurantId = :restId', {
          restId: restaurantExist[0].restaurant_id,
        })
        .andWhere('restaurantCategory.relCategoryId = :catId', {
          catId: categoryExist[0].category_id,
        })
        .execute();
      // console.log(alReadyRelationExist);
      if (alReadyRelationExist?.length) {
        res.status(404).json({ messsage: 'Already Relation exist' });
      } else {
        const relationshipData = await AppDataSource.getRepository(
          RestaurantCategory
        )
          .createQueryBuilder()
          .insert()
          .into(RestaurantCategory)
          .values({
            relRestaurant: restaurantExist[0].restaurant_id,
            relCategory: categoryExist[0].category_id,
          })
          .returning('*')
          .execute();
        res.status(200).json({ data: relationshipData.raw[0] });
      }
    } else {
      res
        .status(404)
        .json({ message: 'Add the Restaurant and category Value' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// };
const getRestaurantImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    console.log(req.query);
    if (id) {
      const getRestaurant = await AppDataSource.getRepository(Restaurant)
        .createQueryBuilder('restaurant')
        .select('restaurant.image')
        .where({ id: id })
        .getRawOne();
      // console.log(getRestaurant);
      if (getRestaurant) {
        const urlSend = getRestaurant.restaurant_image;
        const urlImage = `http://localhost:8000/api/v1/image/${urlSend.filename}`;
        console.log(urlImage);
        res.status(201).json({ data: urlImage });
      } else {
        res.status(404).json({ message: " Restaurant doesn't Exist " });
      }
    } else {
      const getRestaurant = await AppDataSource.getRepository(Restaurant)
        .createQueryBuilder('restaurant')
        .select('restaurant.image')
        .getRawMany();
      if (getRestaurant) {
        const urlSend = getRestaurant;
        const Images = [];
        for (const image of urlSend) {
          const imageObj = image.restaurant_image;
          const urlImage = `http://localhost:8000/api/v1/image/${imageObj.filename}`;
          Images.push(urlImage);
        }
        res.status(201).json({ data: Images });
      } else {
        res.status(404).json({ message: " Restaurant doesn't Exist " });
      }
    }
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

// const createrestrelation = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id, name, address, image } = req.body;
//     const { categoryname } = req.body;

//     const categoryExist = await AppDataSource.getRepository(Category).findOneBy(
//       { name: categoryname }
//     );
//     console.log(categoryExist);

//     const restaurantExist = await AppDataSource.getRepository(
//       Restaurant
//     ).findOneBy({ id: id });
//     console.log(restaurantExist);
//     if (!categoryExist && !restaurantExist) {
//       // console.log('========>>>>>>>', categoryname);
//       console.log('first ifffffffffff');
//       const newCategory = await AppDataSource.createQueryBuilder()
//         .insert()
//         .into(Category)
//         .values({
//           name: categoryname,
//         })
//         .returning('*')
//         .execute();

//       const newRestaurant = await AppDataSource.createQueryBuilder()
//         .insert()
//         .into(Restaurant)
//         .values({
//           name: name,
//           address: address,
//           image: image,
//           category: newCategory.raw,
//         })
//         .returning('*')
//         .execute();

//       // .relation(Restaurant, 'category')
//       // .of(Restaurant)
//       // .set(newCategory);

//       //   AppDataSource.createQueryBuilder()
//       //     .relation(Restaurant, 'category')
//       //     .of(restaurant)
//       //     .add(categoryExist);

//       res.status(200).json({ data: newRestaurant });
//     } else if (categoryExist) {
//       console.log('second ifffffffffff');
//       const newRestaurant = await AppDataSource.createQueryBuilder()
//         .insert()
//         .into(Restaurant)
//         .values({
//           name: name,
//           address: address,
//           image: image,
//           category: categoryExist,
//         })
//         .returning('*')
//         .execute();
//       res.status(200).json({ data: newRestaurant });
//     } else {
//       console.log('third ifffffffffff');
//       const createRestaurantRelation = await AppDataSource.createQueryBuilder()
//         .relation(Restaurant, 'category')
//         .of(Restaurant)
//         .set(categoryExist);
//       res.status(200).json({ data: createRestaurantRelation });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export {
  createRestaurant,
  deleteRestaurant,
  getRestaurant,
  updateRestaurant,
  createRestRelation as createrestrelation,
  getRestaurantImage,
};
