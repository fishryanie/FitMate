/** @format */

import React, { useEffect, useState } from 'react';
import actions, { _onUnmount } from '@redux/actions';
import { Block, EmptyData, Loading, ModalCategoriesSaller, Text } from '@components';
import { FILTER_PRODUCT_SALER } from '@constants';
import { useSelector } from 'react-redux';
import { COLORS } from '@theme';
import { LOTTIES } from '@assets';
import { useDispatch } from 'react-redux';
import { AccordionList } from 'react-native-accordion-list-view';
import { StyleSheet } from 'react-native';
import ModalChangeStatus from './Modal';
import CustomHeader from './Header';
import CustomBody from './Body';

export default function Warehouse() {
  const getCategorySeller = useSelector(state => state.getCategorySeller?.data);
  const isLoading = useSelector(state => state.getStoreProduct.isLoading);
  const hideStoreProduct = useSelector(state => state.hideStoreProduct?.data?.is_show);
  const [open, setOpen] = useState(false);
  const [newArr, setNewArr] = useState([]);
  const [openCategory, setOpenCategory] = useState(false);
  const [filter, setFilter] = useState(FILTER_PRODUCT_SALER[0].id);
  const [category, setCategory] = useState(getCategorySeller?.[0]);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const dispatch = useDispatch();

  const handleRefresh = () => {
    setNewArr([]);
    if (category?.count > 0) {
      category?.arr_sub?.forEach(element => {
        dispatch({
          type: actions.SHOP_GET_PRODUCT,
          params: { group_id: element?.group_id, tab: filter, numshow: 2 },
          onSuccess: res => {
            res.total > 0 && setNewArr(pervious => [...pervious, res]);
          },
        });
      });
    }
  };

  useEffect(() => {
    setNewArr([]);
    if (category?.count > 0) {
      category?.arr_sub?.forEach(element => {
        dispatch({
          type: actions.SHOP_GET_PRODUCT,
          params: { group_id: element?.group_id, tab: filter, numshow: 2 },
          onSuccess: res => {
            res.total > 0 &&
              setNewArr(pervious => {
                return hideStoreProduct ? [...pervious] : [...pervious, res];
              });
          },
        });
      });
    }
    return () => {
      setNewArr([]);
      dispatch({ type: _onUnmount(actions.SHOP_GET_PRODUCT) });
    };
  }, [category?.count, filter, hideStoreProduct]);

  return (
    <Block flex backgroundColor={COLORS.white}>
      {isLoading && <Loading />}
      <ModalChangeStatus open={open} setOpen={setOpen} />
      <ModalCategoriesSaller
        open={openCategory}
        setOpen={setOpenCategory}
        setCategory={setCategory}
      />
      <AccordionList
        data={newArr}
        refreshing={false}
        customTitle={item => (
          <Block flex rowCenter spaceBetween paddingVertical={5}>
            <Block>
              <Text semiBold fontSize={14} numberOfLines={1} color={COLORS.primary}>
                {item?.group_text}
              </Text>
              <Text regular fontSize={14} marginTop={5} color={COLORS.placeholder}>
                {item?.data?.length} sản phẩm
              </Text>
            </Block>
            {/* <Text regular fontSize={14} color={COLORS.placeholder}>
        {item?.products?.length} sản phẩm
      </Text> */}
          </Block>
        )}
        animationDuration={400}
        onRefresh={handleRefresh}
        stickyHeaderIndices={[0]}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        containerItemStyle={styles.containerItemStyle}
        contentContainerStyle={styles.contentContainer}
        customBody={item => (
          <CustomBody filter={filter} setNewArr={setNewArr} listProducts={item.data} />
        )}
        ListHeaderComponent={
          <CustomHeader
            listMenu={FILTER_PRODUCT_SALER}
            category={category}
            chooseMenu={filter}
            setChooseMenu={setFilter}
            setOpenModal={setOpenCategory}
          />
        }
        ListEmptyComponent={
          <EmptyData source={LOTTIES.empty_box} title="Chưa có sản phẩm" />
        }
      />
    </Block>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 50,
    backgroundColor: COLORS.white,
  },
  containerItemStyle: {
    marginBottom: 0,
    paddingRight: 8,
    borderRadius: 0,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderColor: COLORS.placeholder2,
    backgroundColor: COLORS.white,
  },
});
