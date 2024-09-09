package com.example.donzoom.repository;

import com.example.donzoom.entity.StockHistory;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockHistoryRepository extends JpaRepository<StockHistory, Long> {

  // 특정 주식 ID에 대한 가장 최근 기록 조회
  StockHistory findTop1ByStockIdOrderByCreatedAtDesc(Long stockId);

  List<StockHistory> findByStockId(Long stockId);

}